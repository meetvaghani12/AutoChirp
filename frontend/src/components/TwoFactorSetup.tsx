import React, { useState } from "react";
import { useTwoFactorAuth } from "../hooks/useTwoFactorAuth";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AtSign, RefreshCw } from "lucide-react";

interface TwoFactorSetupProps {
  userToken: string;
  twoFactorEnabled: boolean;
  onSetupComplete: (enabled: boolean) => void;
}

export function TwoFactorSetup({ userToken, twoFactorEnabled, onSetupComplete }: TwoFactorSetupProps) {
  const { 
    loading, 
    error, 
    otpSent, 
    email, 
    setupTwoFactor, 
    verifyTwoFactor, 
    requestDisableTwoFactor, 
    disableTwoFactor,
    resendOTP
  } = useTwoFactorAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [setupStep, setSetupStep] = useState<"initial" | "verify" | "complete">("initial");

  const handleSetup = async () => {
    await setupTwoFactor(userToken);
    setSetupStep("verify");
  };

  const handleVerify = async () => {
    const result = await verifyTwoFactor(userToken, verificationCode);
    if (result.success) {
      onSetupComplete(true);
      setSetupStep("complete");
    }
  };

  const handleRequestDisable = async () => {
    await requestDisableTwoFactor(userToken);
  };

  const handleDisable = async () => {
    const result = await disableTwoFactor(userToken, verificationCode);
    if (result.success) {
      onSetupComplete(false);
      setVerificationCode("");
    }
  };

  const handleResend = async () => {
    await resendOTP(userToken);
  };

  if (twoFactorEnabled) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Two-factor authentication is currently enabled for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!otpSent ? (
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  To disable two-factor authentication, you will need to verify your identity.
                </p>
                <Button 
                  onClick={handleRequestDisable} 
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 p-3 rounded-md flex items-start gap-3">
                  <AtSign className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Verification code sent</p>
                    <p className="text-xs text-blue-600 mt-1">
                      We've sent a verification code to {email}. The code will expire in 10 minutes.
                    </p>
                    <button 
                      className="text-xs text-blue-800 flex items-center gap-1 mt-2 hover:underline"
                      onClick={handleResend}
                      disabled={loading}
                    >
                      <RefreshCw className="h-3 w-3" /> Resend code
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </>
            )}
          </div>
        </CardContent>
        {otpSent && (
          <CardFooter>
            <Button 
              onClick={handleDisable} 
              disabled={loading || verificationCode.length !== 6}
              variant="destructive"
              className="w-full"
            >
              {loading ? "Processing..." : "Disable Two-Factor Authentication"}
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }

  if (setupStep === "initial") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Set up Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enhance your account security with two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-6">
            Two-factor authentication adds an extra layer of security to your account. After setup, you'll need both your password and a verification code sent to your email to sign in.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSetup} disabled={loading} className="w-full">
            {loading ? "Setting Up..." : "Set up Two-Factor Authentication"}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (setupStep === "verify") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 p-3 rounded-md flex items-start gap-3">
              <AtSign className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Verification code sent</p>
                <p className="text-xs text-blue-600 mt-1">
                  We've sent a verification code to {email}. The code will expire in 10 minutes.
                </p>
                <button 
                  className="text-xs text-blue-800 flex items-center gap-1 mt-2 hover:underline"
                  onClick={handleResend}
                  disabled={loading}
                >
                  <RefreshCw className="h-3 w-3" /> Resend code
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleVerify} 
            disabled={loading || verificationCode.length !== 6}
            className="w-full"
          >
            {loading ? "Verifying..." : "Verify and Activate"}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Setup Complete</CardTitle>
        <CardDescription>
          Two-factor authentication has been enabled for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          You will now need to enter a verification code sent to your email when you log in.
        </p>
      </CardContent>
    </Card>
  );
} 