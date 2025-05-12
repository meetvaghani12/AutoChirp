import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

// Create a Nodemailer transporter
let transporter: nodemailer.Transporter;

// In development, if no email credentials are provided, use a console-based transport
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log('Email credentials not found in environment variables. Using console transport.');
  
  // Create a transport that logs to console instead of sending emails
  transporter = nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
    buffer: true
  });
} else {
  // Use actual SMTP transport for production
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

/**
 * Generates a random 6-digit OTP
 */
export const generateOTP = (): string => {
  // Generate a 6-digit number
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Sends an OTP email to the specified recipient
 * In development mode without email credentials, logs to console instead
 */
export const sendOTPEmail = async (
  to: string,
  otp: string,
  name: string
): Promise<boolean> => {
  try {
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@example.com',
      to,
      subject: 'Your One-Time Password for Authentication',
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
              <h2 style="color: #333; text-align: center;">Your One-Time Password</h2>
              <p>Hello ${name},</p>
              <p>Your one-time password for authentication is:</p>
              <div style="margin: 20px auto; text-align: center; padding: 10px; background-color: #f8f8f8; border-radius: 5px; font-size: 24px; letter-spacing: 2px; font-weight: bold;">
                  ${otp}
              </div>
              <p>This code will expire in 10 minutes.</p>
              <p>If you didn't request this code, please ignore this email or contact support if you have concerns.</p>
              <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
                  This is an automated message, please do not reply.
              </p>
          </div>
      `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Log mail info in development mode only if using console transport
    if (process.env.NODE_ENV !== 'production' && !process.env.EMAIL_USER) {
      if (info.message) {
        console.log(`OTP Code: ${otp} sent to ${to}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Still return true in development to allow testing
    if (process.env.NODE_ENV !== 'production' && !process.env.EMAIL_USER) {
      console.log(`DEVELOPMENT MODE: Pretending email was sent to ${to} with OTP: ${otp}`);
      return true;
    }
    
    return false;
  }
};

export default {
  generateOTP,
  sendOTPEmail
}; 