import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { sendEmail } from '../utils/sendEmail.js';
import { generateOTP } from "../utils/generateOtp.js";
import  redis  from '../utils/redis.js'; // Redis client import

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: cloudResponse ? cloudResponse.secure_url : "",
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;

        //cloudinary upload for profile photo
        let skillsArray;
        if(skills){
            skillsArray = skills.split(',');
        }
        const userId = req.id; //middleware
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skillsArray) user.profile.skills = skillsArray;

        //resume comes later

        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({       
            message: "Profile updated successfully",
            user,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOTP();
        
        // OTP ko Redis mein 5 mins ke liye save karein
        await redis.set(email, otp, 'EX', 300); 

        await sendEmail(email, otp);

        return res.status(200).json({
            message: "OTP sent to your email",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending OTP", success: false });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1. Redis se OTP uthao
        const storedOtp = await redis.get(email); 

        // 2. Check agar OTP expire ho gaya ya nahi mila
        if (!storedOtp) {
            return res.status(400).json({ 
                message: "OTP expired. Please resend.", 
                success: false 
            });
        }

        // 3. Match logic
        if (storedOtp === otp) {
            // MongoDB update karein
            const user = await User.findOneAndUpdate({ email }, { isVerified: true }); 

            if (!user) {
                return res.status(404).json({ message: "User not found", success: false });
            }
            
            // Verification ke baad cleanup
            await redis.del(email); 
            
            return res.status(200).json({ 
                message: "Email verified successfully!", 
                success: true 
            });
        } else {
            return res.status(400).json({ 
                message: "Invalid OTP. Try again.", 
                success: false 
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};