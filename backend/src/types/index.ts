import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    isVerified: boolean;
    twoFactorEnabled: boolean;
    otp: {
        code: string | null;
        expiresAt: Date | null;
    };
    createdAt: Date;
    updatedAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface UserInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
    otp?: string;
}

export interface UserResponse {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
    isVerified: boolean;
    twoFactorEnabled: boolean;
}

export interface EmailOTPResponse {
    message: string;
    email: string;
} 