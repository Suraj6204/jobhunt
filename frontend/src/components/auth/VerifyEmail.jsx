import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setLoading } from '@/redux/authSlice';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const VerifyEmail = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const { tempEmail, loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputRefs = useRef([]);

    useEffect(() => {
        if (!tempEmail) {
            navigate("/signup");
        }
    }, [tempEmail, navigate]);

    // Handle OTP logic (boxes focus shift)
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const verifyHandler = async (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");
        if (finalOtp.length < 6) return toast.error("Please enter full OTP");

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/verify-email`, { 
                email: tempEmail, 
                otp: finalOtp 
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className='flex items-center justify-center h-screen px-4 bg-gray-50/30'>
            <div className='flex flex-col items-center w-full max-w-[440px] text-center'>
                
                {/* Logo Section */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="flex items-center gap-1 mb-6">
                        <span className="text-3xl font-bold tracking-tighter text-[#1d293d]">Job</span>
                        <span className="text-3xl font-bold tracking-tighter text-[oklch(39.288%_0.0643_347.669)]">Hunt</span>
                    </div>
                    <h2 className='text-[28px] font-semibold text-gray-900'>Great, now verify your email</h2>
                </div>

                {/* Illustration/Icon */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                        <div className="w-16 h-12 border-2 border-gray-300 rounded relative bg-white">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Info */}
                <p className='text-gray-600 mb-8 leading-relaxed px-6'>
                    Check your inbox at <span className="font-semibold text-gray-900">{tempEmail || "your email"}</span> and 
                    enter the 6-digit code below to complete your registration.
                </p>

                {/* OTP Form */}
                <form onSubmit={verifyHandler} className='w-full'>
                    <div className="flex justify-between gap-2 mb-8">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-12 h-14 border-2 border-muted-foreground rounded-lg text-center text-2xl font-bold focus:border-[oklch(39.288%_0.0643_347.669)] focus:ring-1 focus:ring-[oklch(39.288%_0.0643_347.669)] outline-none transition-all"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>

                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-6 text-lg font-medium text-muted bg-[oklch(39.288%_0.0643_347.669)] hover:bg-[oklch(34.977%_0.07996_348.946)] transition-all shadow-md active:scale-[0.98]"
                    >
                        {loading ? (
                            <><Loader2 className='mr-2 h-5 w-5 animate-spin'/> Verifying...</>
                        ) : (
                            "Verify Email"
                        )}
                    </Button>
                </form>

                {/* Footer Links */}
                {/* <div className="mt-8 text-sm text-gray-500 space-y-3">
                    <p>Don't see an email? <button type="button" className="text-[oklch(39.288%_0.0643_347.669)] font-medium hover:underline">Check your spam folder</button></p>
                    <p>Link expired? <button type="button" className="text-[oklch(39.288%_0.0643_347.669)] font-medium hover:underline">Resend verification code</button></p>
                </div> */}
            </div>
        </div>
    );
};

export default VerifyEmail;