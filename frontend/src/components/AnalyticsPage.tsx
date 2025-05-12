
import { useState } from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, MessageSquare, Clock } from "lucide-react";
import Sidebar from "./Sidebar";

// Mock data for charts
const messageData = [
  { name: "Jan", sent: 400, received: 240 },
  { name: "Feb", sent: 300, received: 139 },
  { name: "Mar", sent: 200, received: 980 },
  { name: "Apr", sent: 278, received: 390 },
  { name: "May", sent: 189, received: 480 },
  { name: "Jun", sent: 239, received: 380 },
  { name: "Jul", sent: 349, received: 430 },
];

const engagementData = [
  { name: "Jan", rate: 67 },
  { name: "Feb", rate: 52 },
  { name: "Mar", rate: 73 },
  { name: "Apr", rate: 69 },
  { name: "May", rate: 53 },
  { name: "Jun", rate: 60 },
  { name: "Jul", rate: 72 },
];

const conversionData = [
  { name: "Welcome", value: 35 },
  { name: "Promo", value: 25 },
  { name: "Follow-up", value: 20 },
  { name: "Re-engagement", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["hsl(var(--primary))", "#6366F1", "#8B5CF6", "#EC4899", "#F43F5E"];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <Select defaultValue="7d" onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { 
              title: "Total Messages", 
              value: "2,451", 
              change: "+12.5%", 
              icon: <MessageSquare className="h-5 w-5" />,
              positive: true 
            },
            { 
              title: "Engagement Rate", 
              value: "64.2%", 
              change: "+5.3%", 
              icon: <TrendingUp className="h-5 w-5" />,
              positive: true 
            },
            { 
              title: "Response Rate", 
              value: "82%", 
              change: "-2.1%", 
              icon: <BarChart3 className="h-5 w-5" />,
              positive: false 
            },
            { 
              title: "Avg. Response Time", 
              value: "2.4m", 
              change: "-30s", 
              icon: <Clock className="h-5 w-5" />,
              positive: true 
            },
          ].map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="rounded-full bg-primary/20 p-1 text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                  {stat.change} from previous period
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Detailed Analytics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="messages" className="space-y-4">
            <TabsList>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="engagement" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Engagement
              </TabsTrigger>
              <TabsTrigger value="audience" className="gap-2">
                <Users className="h-4 w-4" />
                Audience
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Message Volume</CardTitle>
                  <CardDescription>Total messages sent and received over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={messageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sent" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="received" stroke="#8B5CF6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Message Breakdown</CardTitle>
                    <CardDescription>Types of automated messages sent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <Pie
                            data={conversionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            label
                          >
                            {conversionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Message Performance</CardTitle>
                    <CardDescription>Engagement by message type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: "Welcome", engagement: 85 },
                          { name: "Promo", engagement: 65 },
                          { name: "Follow-up", engagement: 76 },
                          { name: "Re-engage", engagement: 58 },
                        ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trends</CardTitle>
                  <CardDescription>User engagement rates over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="rate" 
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1} 
                          fill="url(#colorRate)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Response Time Analysis</CardTitle>
                    <CardDescription>Average response times by hour</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { hour: "12 AM", time: 3.2 },
                          { hour: "4 AM", time: 2.8 },
                          { hour: "8 AM", time: 1.5 },
                          { hour: "12 PM", time: 4.1 },
                          { hour: "4 PM", time: 3.0 },
                          { hour: "8 PM", time: 2.2 },
                        ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="time" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Rates</CardTitle>
                    <CardDescription>Percentage of messages leading to action</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { type: "Link Click", rate: 24 },
                          { type: "Profile Visit", rate: 37 },
                          { type: "Follow", rate: 13 },
                          { type: "Purchase", rate: 8 },
                        ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                          <XAxis dataKey="type" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="rate" fill="#EC4899" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Growth</CardTitle>
                  <CardDescription>Follower growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { month: "Jan", followers: 1200 },
                        { month: "Feb", followers: 1350 },
                        { month: "Mar", followers: 1500 },
                        { month: "Apr", followers: 1800 },
                        { month: "May", followers: 2100 },
                        { month: "Jun", followers: 2400 },
                        { month: "Jul", followers: 2800 },
                      ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="followers" stroke="hsl(var(--primary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Demographics</CardTitle>
                    <CardDescription>Follower age distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { age: "13-17", percentage: 8 },
                          { age: "18-24", percentage: 32 },
                          { age: "25-34", percentage: 41 },
                          { age: "35-44", percentage: 15 },
                          { age: "45+", percentage: 4 },
                        ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                          <XAxis dataKey="age" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="percentage" fill="#6366F1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Location</CardTitle>
                    <CardDescription>Top countries of followers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          layout="vertical"
                          data={[
                            { country: "United States", value: 42 },
                            { country: "United Kingdom", value: 18 },
                            { country: "Canada", value: 12 },
                            { country: "Australia", value: 9 },
                            { country: "Germany", value: 7 },
                            { country: "Other", value: 12 },
                          ]} 
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                          <XAxis type="number" />
                          <YAxis dataKey="country" type="category" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#F43F5E" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
