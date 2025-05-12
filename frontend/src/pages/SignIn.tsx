import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { useTwoFactorAuth } from "@/hooks/useTwoFactorAuth";
import { TwoFactorVerificationModal } from "@/components/TwoFactorVerificationModal";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { verifyLogin } = useTwoFactorAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = formData;
      const result = await verifyLogin(email, password);
      
      if (result.requiresVerification) {
        // Account not verified, redirect to verification page
        toast({
          title: "Account not verified",
          description: "Please verify your account with the code sent to your email.",
        });
        navigate(`/verify?email=${encodeURIComponent(email)}`, {
          state: { email }
        });
        setLoading(false);
        return;
      }
      
      if (result.requiresOTP) {
        // Save email for the 2FA modal
        setUserEmail(result.email || email);
        // Show 2FA verification modal
        setShowTwoFactorModal(true);
        setLoading(false);
        return;
      }
      
      if (result.success) {
        // Normal login without 2FA
        await login(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      } else {
        throw new Error(result.error || "Authentication failed");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleVerifyTwoFactor = async (code: string) => {
    setLoading(true);
    setTwoFactorError(undefined);
    
    try {
      const { email, password } = formData;
      const result = await verifyLogin(email, password, code);
      
      if (result.success) {
        // Login with 2FA
        await login(email, password, code);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        setShowTwoFactorModal(false);
        navigate("/dashboard");
      } else {
        setTwoFactorError(result.error || "Invalid verification code");
      }
    } catch (error: any) {
      setTwoFactorError(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const { email, password } = formData;
      await verifyLogin(email, password);
      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend verification code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-12 top-0"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <div className="rounded-full bg-primary p-1">
              {/* <Instagram className="h-5 w-5 text-primary-foreground" /> */}
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">AutoChirp</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Sign in to access your account
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="text-sm text-right">
              <Link to="/reset-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
            
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                to="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </motion.div>

      <TwoFactorVerificationModal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        onVerify={handleVerifyTwoFactor}
        onResend={handleResendOTP}
        isLoading={loading}
        error={twoFactorError}
        email={userEmail}
      />
    </div>
  );
};

export default SignIn; 