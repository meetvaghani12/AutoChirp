import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { UserInput, LoginInput, UserResponse, IUser, EmailOTPResponse } from '../types';
import emailService from '../utils/emailService';

// Extend Express Request to include user
interface AuthRequest extends Request {
    user?: IUser;
}

// Generate JWT
const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req: Request<{}, {}, UserInput>, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate OTP for verification
        const otp = emailService.generateOTP();
        
        // Set OTP expiration to 10 minutes from now
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        // Create a temporary user with unverified status
        const user = await User.create({
            name,
            email,
            password,
            isVerified: false, // Mark as unverified initially
            twoFactorEnabled: true, // Enable 2FA by default
            otp: {
                code: otp,
                expiresAt
            }
        });

        if (user) {
            // Send OTP email
            const emailSent = await emailService.sendOTPEmail(user.email, otp, user.name);

            res.status(201).json({
                message: 'Account created! Please verify your email with the OTP sent.',
                email: user.email,
                requiresVerification: true
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req: Request<{}, {}, LoginInput>, res: Response) => {
    try {
        const { email, password, otp } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({ 
                message: 'Account not verified',
                requiresVerification: true,
                email: user.email
            });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If 2FA is enabled, verify the OTP
        if (user.twoFactorEnabled) {
            if (!otp) {
                // Generate and send OTP
                const newOTP = emailService.generateOTP();
                
                // Set OTP expiration to 10 minutes from now
                const expiresAt = new Date();
                expiresAt.setMinutes(expiresAt.getMinutes() + 10);
                
                // Save OTP to user
                user.otp = {
                    code: newOTP,
                    expiresAt
                };
                await user.save();
                
                // Send OTP email
                await emailService.sendOTPEmail(user.email, newOTP, user.name);
                
                return res.status(200).json({ 
                    message: 'OTP sent to your email',
                    requiresOTP: true,
                    email: user.email
                });
            }

            // Verify the OTP
            if (!user.otp.code || !user.otp.expiresAt) {
                return res.status(400).json({ message: 'OTP not generated or expired' });
            }

            // Check if OTP is expired
            if (new Date() > new Date(user.otp.expiresAt)) {
                return res.status(400).json({ message: 'OTP expired' });
            }

            // Check if OTP matches
            if (otp !== user.otp.code) {
                return res.status(401).json({ message: 'Invalid OTP' });
            }

            // Clear OTP after successful verification
            user.otp = {
                code: null,
                expiresAt: null
            };
            await user.save();
        }

        const userResponse: UserResponse = {
            _id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            token: generateToken(String(user._id)),
            twoFactorEnabled: user.twoFactorEnabled
        };

        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};

// @desc    Setup 2FA with Email OTP
// @route   POST /api/users/2fa/setup
// @access  Private
export const setupTwoFactor = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = emailService.generateOTP();
        
        // Set OTP expiration to 10 minutes from now
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        
        // Save OTP to user
        user.otp = {
            code: otp,
            expiresAt
        };
        await user.save();
        
        // Send OTP email
        const emailSent = await emailService.sendOTPEmail(user.email, otp, user.name);
        
        if (!emailSent) {
            return res.status(500).json({ message: 'Failed to send OTP email' });
        }

        const response: EmailOTPResponse = {
            message: 'OTP sent to your email',
            email: user.email
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};

// @desc    Verify and enable 2FA
// @route   POST /api/users/2fa/verify
// @access  Private
export const verifyTwoFactor = async (req: AuthRequest, res: Response) => {
    try {
        const { otp } = req.body;
        const user = await User.findById(req.user?._id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.otp.code || !user.otp.expiresAt) {
            return res.status(400).json({ message: 'OTP not generated or expired' });
        }

        // Check if OTP is expired
        if (new Date() > new Date(user.otp.expiresAt)) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        // Check if OTP matches
        if (otp !== user.otp.code) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // Clear OTP after successful verification
        user.otp = {
            code: null,
            expiresAt: null
        };
        
        // Enable 2FA
        user.twoFactorEnabled = true;
        await user.save();

        res.json({ message: '2FA enabled successfully' });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};

// @desc    Disable 2FA
// @route   POST /api/users/2fa/disable
// @access  Private
export const disableTwoFactor = async (req: AuthRequest, res: Response) => {
    try {
        const { otp } = req.body;
        const user = await User.findById(req.user?._id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.twoFactorEnabled) {
            return res.status(400).json({ message: '2FA is not enabled' });
        }

        // For disabling, send a new OTP if not provided
        if (!otp) {
            // Generate OTP
            const newOTP = emailService.generateOTP();
            
            // Set OTP expiration to 10 minutes from now
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + 10);
            
            // Save OTP to user
            user.otp = {
                code: newOTP,
                expiresAt
            };
            await user.save();
            
            // Send OTP email
            await emailService.sendOTPEmail(user.email, newOTP, user.name);
            
            return res.status(200).json({ 
                message: 'OTP sent to your email',
                email: user.email
            });
        }

        // Verify the OTP
        if (!user.otp.code || !user.otp.expiresAt) {
            return res.status(400).json({ message: 'OTP not generated or expired' });
        }

        // Check if OTP is expired
        if (new Date() > new Date(user.otp.expiresAt)) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        // Check if OTP matches
        if (otp !== user.otp.code) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // Clear OTP and disable 2FA
        user.otp = {
            code: null,
            expiresAt: null
        };
        user.twoFactorEnabled = false;
        await user.save();

        res.json({ message: '2FA disabled successfully' });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userResponse: UserResponse = {
            _id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            token: generateToken(String(user._id)),
            twoFactorEnabled: user.twoFactorEnabled
        };

        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
};

// @desc    Verify user registration with OTP
// @route   POST /api/users/verify-registration
// @access  Public
export const verifyRegistration = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        // Check if OTP exists
        if (!user.otp.code || !user.otp.expiresAt) {
            return res.status(400).json({ message: 'OTP not found or expired' });
        }

        // Check if OTP is expired
        if (new Date() > new Date(user.otp.expiresAt)) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Check if OTP matches
        if (otp !== user.otp.code) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // Mark user as verified
        user.isVerified = true;
        
        // Clear OTP
        user.otp = {
            code: null,
            expiresAt: null
        };
        
        await user.save();

        // Generate token and return user data
        const userResponse: UserResponse = {
            _id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            token: generateToken(String(user._id)),
            twoFactorEnabled: user.twoFactorEnabled
        };

        res.status(200).json({
            ...userResponse,
            message: 'Account verified successfully'
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
    }
}; 