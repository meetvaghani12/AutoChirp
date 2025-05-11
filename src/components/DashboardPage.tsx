
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Instagram, MessageSquare, User, Users, Zap,Settings, ChevronRight } from "lucide-react";
import Sidebar from "./Sidebar";

// Mock data for charts
const messageData = [
  { name: "Mon", messages: 40 },
  { name: "Tue", messages: 30 },
  { name: "Wed", messages: 20 },
  { name: "Thu", messages: 27 },
  { name: "Fri", messages: 18 },
  { name: "Sat", messages: 23 },
  { name: "Sun", messages: 34 },
];

const engagementData = [
  { name: "Mon", rate: 65 },
  { name: "Tue", rate: 59 },
  { name: "Wed", rate: 80 },
  { name: "Thu", rate: 81 },
  { name: "Fri", rate: 56 },
  { name: "Sat", rate: 55 },
  { name: "Sun", rate: 40 },
];

export default function DashboardPage() {
  const [progress, setProgress] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleConnect = () => {
    setIsConnected(!isConnected);
  };
  
  const handleToggleAutomation = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <Card className={`mb-6 ${isConnected ? "border-primary/30" : "border-destructive/30"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Instagram Connection</CardTitle>
            <CardDescription>Connect your Instagram account to start automating messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5" />
                <span>{isConnected ? "Connected as @johndoe" : "Not Connected"}</span>
                {isConnected && (
                  <Badge variant="outline" className="ml-2 bg-primary/20 text-xs">
                    Active
                  </Badge>
                )}
              </div>
              <Button onClick={handleConnect} variant={isConnected ? "outline" : "default"}>
                {isConnected ? "Disconnect" : "Connect with Instagram"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Automation Status</CardTitle>
                <CardDescription>Current automation activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                      {isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Messages Today:</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Rate:</span>
                    <span className="font-medium">82%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleToggleAutomation} 
                  variant={isActive ? "destructive" : "default"} 
                  className="w-full"
                >
                  {isActive ? "Pause Automation" : "Start Automation"}
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Message Analytics</CardTitle>
                <CardDescription>Past 7 days of activity</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={messageData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="messages"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorMessages)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Messages: 192</span>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View Details
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Engagement Rate</CardTitle>
                <CardDescription>Response to automated messages</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <Tooltip />
                      <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg. Rate: 62%</span>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View Details
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Account Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Account Overview</CardTitle>
              <CardDescription>Your current subscription and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary">Pro Plan</Badge>
                    <span className="text-xs text-muted-foreground">Renews on May 21, 2023</span>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Monthly message limit</span>
                      <span className="font-medium">660 / 1000</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span>Unlimited automation rules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Audience segmentation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Upgrade to Enterprise</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unlock additional features and higher message limits with our Enterprise plan.
                  </p>
                  <Button variant="outline" className="w-full">Upgrade Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your latest automation events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="rounded-full bg-primary/20 p-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {item === 1 ? "Automated response sent to @user123" : 
                         item === 2 ? "New follower message sequence triggered" : 
                         item === 3 ? "Welcome message sent to new follower" : 
                         "Engagement campaign completed"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item === 1 ? "5 minutes ago" : 
                         item === 2 ? "1 hour ago" : 
                         item === 3 ? "3 hours ago" : 
                         "Yesterday"}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
