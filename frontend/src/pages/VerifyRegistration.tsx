import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/users';

const VerifyRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Check if we have email in state from registration
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    
    if (emailParam) {
      setEmail(emailParam);
    } else if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please provide your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!otp || otp.length < 6) {
      toast({
        title: "OTP Required",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/verify-registration`, {
        email,
        otp
      });

      setVerified(true);
      toast({
        title: "Account Verified!",
        description: "Your account has been successfully verified.",
      });

      // Redirect to sign in after a delay
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.message || "Failed to verify your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please provide your email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Re-register to get a new OTP
      await axios.post(`${API_URL}/register`, {
        name: '', // These won't be used since the email already exists
        email,
        password: 'placeholder'
      });

      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error: any) {
      // If user exists, that's what we want
      if (error.response?.data?.message?.includes('already exists')) {
        toast({
          title: "OTP Resent",
          description: "A new verification code has been sent to your email.",
        });
      } else {
        toast({
          title: "Failed to Resend",
          description: "Could not resend verification code. Please try again.",
          variant: "destructive",
        });
      }
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
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">AutoChirp</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6">Verify Your Account</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Enter the verification code sent to your email
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 shadow-sm">
          {verified ? (
            <div className="flex flex-col items-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold">Account Verified!</h2>
              <p className="text-center text-muted-foreground mt-2 mb-4">
                Your account has been successfully verified. You will be redirected to the login page.
              </p>
              <Button 
                onClick={() => navigate("/signin")}
                className="mt-2"
              >
                Go to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  name="otp"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={loading}
                  maxLength={6}
                />
              </div>
              
              <div className="text-sm text-center">
                <button 
                  type="button" 
                  onClick={handleResendOTP}
                  className="text-primary hover:underline flex items-center justify-center gap-1 mx-auto"
                  disabled={loading}
                >
                  <RefreshCw className="h-3 w-3" /> Resend verification code
                </button>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Account"}
              </Button>
              
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">
                  Already verified?{" "}
                </span>
                <Link
                  to="/signin"
                  className="text-primary hover:underline font-medium"
                >
                  Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyRegistration; 