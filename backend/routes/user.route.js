import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { isVerified } from '../middleware/isVerified.js'; 
import { 
    login, 
    register, 
    logout, 
    updateProfile, 
    sendOTP, 
    verifyEmail 
} from '../controllers/user.controller.js'; 
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

// 1. Basic Auth Routes
router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);

// 2. Email Verification Routes (Bina login ke bhi access ho sakte hain signup ke waqt)
router.route('/send-otp').post(sendOTP); // OTP bhejne ke liye
router.route('/verify-email').post(verifyEmail); // OTP verify karne ke liye

// 3. Protected Routes (Login + Verification dono zaroori hain)
router.route('/profile/update').post(isAuthenticated, isVerified, singleUpload, updateProfile);

export default router;