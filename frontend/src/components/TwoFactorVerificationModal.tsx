import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AtSign, RefreshCw } from "lucide-react";

interface TwoFactorVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
  isLoading: boolean;
  error?: string;
  email?: string;
}

export function TwoFactorVerificationModal({
  isOpen,
  onClose,
  onVerify,
  onResend,
  isLoading,
  error,
  email,
}: TwoFactorVerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerify = async () => {
    await onVerify(verificationCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && verificationCode.length === 6 && !isLoading) {
      handleVerify();
    }
  };

  const handleResend = async () => {
    if (onResend) {
      await onResend();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Verification</DialogTitle>
          <DialogDescription>
            Enter the verification code sent to your email.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          {email && (
            <div className="bg-blue-50 p-3 rounded-md flex items-start gap-3">
              <AtSign className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Verification code sent</p>
                <p className="text-xs text-blue-600 mt-1">
                  We've sent a verification code to {email}. The code will expire in 10 minutes.
                </p>
                {onResend && (
                  <button 
                    className="text-xs text-blue-800 flex items-center gap-1 mt-2 hover:underline"
                    onClick={handleResend}
                    disabled={isLoading}
                  >
                    <RefreshCw className="h-3 w-3" /> Resend code
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="twoFactorCode">Verification Code</Label>
            <Input
              id="twoFactorCode"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              maxLength={6}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="text-sm text-gray-500">
            <p>
              Open your email to view your verification code.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleVerify}
            disabled={isLoading || verificationCode.length !== 6}
            className="w-full"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 