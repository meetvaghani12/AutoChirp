import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const useTwoFactorAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  // Setup 2FA - Sends OTP to user's email
  const setupTwoFactor = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/2fa/setup`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOtpSent(true);
      setEmail(response.data.email);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error setting up 2FA');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify and enable 2FA
  const verifyTwoFactor = useCallback(
    async (token: string, otp: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${API_URL}/2fa/verify`,
          { otp },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { success: true, data: response.data };
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error verifying OTP');
        return { success: false, error: err.response?.data?.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Request to disable 2FA
  const requestDisableTwoFactor = useCallback(
    async (token: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${API_URL}/2fa/disable`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOtpSent(true);
        setEmail(response.data.email);
        return { success: true, data: response.data };
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error requesting OTP');
        return { success: false, error: err.response?.data?.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Disable 2FA
  const disableTwoFactor = useCallback(
    async (token: string, otp: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${API_URL}/2fa/disable`,
          { otp },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { success: true, data: response.data };
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error disabling 2FA');
        return { success: false, error: err.response?.data?.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Verify during login
  const verifyLogin = useCallback(
    async (email: string, password: string, otp?: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${API_URL}/login`, {
          email,
          password,
          otp,
        });
        return { success: true, data: response.data };
      } catch (err: any) {
        const requiresOTP = err.response?.data?.requiresOTP;
        const requiresVerification = err.response?.data?.requiresVerification;
        
        if (requiresOTP) {
          setEmail(err.response?.data?.email);
          setOtpSent(true);
          setError('OTP sent to your email');
        } else if (requiresVerification) {
          setEmail(err.response?.data?.email);
          setError('Account not verified');
        } else {
          setError(err.response?.data?.message || 'Login failed');
        }
        
        return {
          success: false,
          requiresOTP,
          requiresVerification,
          email: err.response?.data?.email,
          error: err.response?.data?.message,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resendOTP = useCallback(
    async (token: string) => {
      return setupTwoFactor(token);
    },
    [setupTwoFactor]
  );

  return {
    loading,
    error,
    otpSent,
    email,
    setupTwoFactor,
    verifyTwoFactor,
    requestDisableTwoFactor,
    disableTwoFactor,
    verifyLogin,
    resendOTP,
  };
}; 