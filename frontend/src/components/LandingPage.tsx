import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  CheckCircle, 
  ArrowRight, 
  Zap,
  BarChart3,
  MessageSquare,
  Clock,
  Users
} from "lucide-react";
import Navbar from "./Navbar";
import { useAuth } from "./AuthProvider";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <motion.div 
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <motion.h1 
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Automate Instagram messages <span className="text-gradient">effortlessly</span>
                </motion.h1>
                <motion.p 
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Boost your engagement and save time with our powerful Instagram message automation platform.
                </motion.p>
              </div>
              <motion.div 
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="gap-1">
                      Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/signin">
                    <Button size="lg" className="gap-1">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </motion.div>
              <motion.div 
                className="mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {/* <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    <span>No credit card</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    <span>Free to try</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    <span>Cancel anytime</span>
                  </div>
                </div> */}
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-background/50 md:rounded-2xl">
                <div className="glass-effect rounded-xl p-6 md:rounded-2xl md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="rounded-full bg-primary p-1">
                      {/* <Instagram className="h-5 w-5 text-primary-foreground" /> */}
                    </div>
                    <span className="text-xl font-bold">Automation Stats</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5 rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Messages</span>
                      </div>
                      <div className="font-bold text-2xl">253</div>
                      <div className="text-xs text-muted-foreground">+12% from last week</div>
                    </div>
                    <div className="flex flex-col space-y-1.5 rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Reach</span>
                      </div>
                      <div className="font-bold text-2xl">1.2k</div>
                      <div className="text-xs text-muted-foreground">+18% from last week</div>
                    </div>
                    <div className="flex flex-col space-y-1.5 rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Time Saved</span>
                      </div>
                      <div className="font-bold text-2xl">8h</div>
                      <div className="text-xs text-muted-foreground">+5h from last week</div>
                    </div>
                    <div className="flex flex-col space-y-1.5 rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Engagement</span>
                      </div>
                      <div className="font-bold text-2xl">82%</div>
                      <div className="text-xs text-muted-foreground">+7% from last week</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" className="w-full gap-2">
                      <Instagram className="h-4 w-4" />
                      Connect with Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything you need to <span className="text-gradient">automate</span> your Instagram messages
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Our platform offers powerful tools to help you grow your Instagram presence and engage with your audience.
              </p>
            </div>
          </div>
          <motion.div 
            className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="flex flex-col items-start space-y-4" variants={item}>
              <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Automated Responses</h3>
              <p className="text-muted-foreground">
                Set up automatic replies to common messages and inquiries, saving you hours each day.
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-start space-y-4" variants={item}>
              <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Instant Engagement</h3>
              <p className="text-muted-foreground">
                Respond to followers instantly with personalized messages that increase engagement.
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-start space-y-4" variants={item}>
              <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Track your engagement metrics and optimize your messaging strategy with detailed analytics.
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-start space-y-4" variants={item}>
              <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Audience Segmentation</h3>
              <p className="text-muted-foreground">
                Target specific audience segments with tailored messages to increase conversion rates.
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-start space-y-4" variants={item}>
              <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Scheduled Messaging</h3>
              <p className="text-muted-foreground">
                Schedule messages to be sent at optimal times when your audience is most active.
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-start space-y-4" variants={item}>
              <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                <Instagram className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Instagram Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly connect with your Instagram account for a smooth automation experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to <span className="text-gradient">transform</span> your Instagram messaging?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                Join thousands of creators and businesses who use AutoChirp to automate their Instagram messages.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="gap-1">
                    Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link to="/signin">
                  <Button size="lg" className="gap-1">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/20">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-1">
               <Zap className="h-5 w-5 text-primary-foreground" />
              {/* <Instagram className="h-4 w-4 text-primary-foreground" /> */}
            </div>
            <span className="text-lg font-bold">AutoChirp</span>
          </div>
          <nav className="flex gap-4 sm:gap-6 md:ml-auto">
            <Link to="#" className="text-sm hover:underline underline-offset-4">
              Terms
            </Link>
            <Link to="#" className="text-sm hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link to="#" className="text-sm hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
        <div className="container py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AutoChirp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
