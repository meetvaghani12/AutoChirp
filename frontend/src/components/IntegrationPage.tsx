import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Instagram, AlertCircle, User, Check, X, Copy, ArrowUpRight, RefreshCcw } from "lucide-react";
import { Layout } from "./Sidebar";

export default function IntegrationPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleDisconnect = () => {
    setIsConnected(false);
  };
  
  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Instagram Integration</h1>
        </div>

        <Tabs defaultValue="connect" className="mb-6">
          <TabsList>
            <TabsTrigger value="connect">Connect</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">Connection History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connect">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instagram Account Connection</CardTitle>
                  <CardDescription>
                    Connect your Instagram account to enable automation features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {!isConnected ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                      >
                        <div className="rounded-full bg-muted p-6 mb-4">
                          <Instagram className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Connect Instagram</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          To start automating your Instagram messages, you need to connect your Instagram account.
                        </p>
                        <Button 
                          size="lg" 
                          onClick={handleConnect}
                          disabled={isLoading}
                          className="gap-2"
                        >
                          <Instagram className="h-5 w-5" />
                          {isLoading ? "Connecting..." : "Connect with Instagram"}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">
                          We use Instagram's official API and never store your password.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-6"
                      >
                        <div className="rounded-lg border bg-card p-6 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                              <User className="h-8 w-8 text-foreground" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold">@johndoe</h3>
                                <Badge className="bg-green-500/20 text-green-500 text-xs">Connected</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">John Doe • Personal Account</p>
                              <p className="text-sm">1.2k followers • 568 following</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-1">
                              <RefreshCcw className="h-3.5 w-3.5" />
                              Refresh
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleDisconnect} className="text-destructive gap-1">
                              <X className="h-3.5 w-3.5" />
                              Disconnect
                            </Button>
                          </div>
                        </div>
                        
                        <Alert className="mt-6">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Connection successful</AlertTitle>
                          <AlertDescription>
                            Your Instagram account has been successfully connected. You can now set up automation rules.
                          </AlertDescription>
                        </Alert>
                        
                        <div className="mt-8">
                          <h3 className="text-lg font-medium mb-4">Account Permissions</h3>
                          <div className="space-y-3">
                            {[
                              "Read messages and send direct messages",
                              "Access basic profile information",
                              "Monitor follower activity",
                              "Respond to comments"
                            ].map((permission, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-500" />
                                <span>{permission}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Integration FAQ</CardTitle>
                  <CardDescription>
                    Common questions about our Instagram integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        q: "Is this integration safe for my Instagram account?",
                        a: "Yes, we use Instagram's official API and comply with their terms of service. We never ask for your password and use secure OAuth authentication."
                      },
                      {
                        q: "Will Instagram know I'm using automation?",
                        a: "Our service follows Instagram's rate limits and guidelines. We implement delays and randomization to ensure your activity appears natural and complies with Instagram's policies."
                      },
                      {
                        q: "What happens if I disconnect my account?",
                        a: "All automation will immediately stop, and we'll revoke our access to your Instagram account. You can reconnect at any time."
                      },
                      {
                        q: "Can I connect multiple Instagram accounts?",
                        a: "Yes, depending on your subscription plan. Basic allows 1 account, Pro allows up to 3, and Enterprise offers unlimited accounts."
                      }
                    ].map((faq, i) => (
                      <div key={i}>
                        <h3 className="font-medium mb-2">{faq.q}</h3>
                        <p className="text-sm text-muted-foreground">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>
                  Configure how AutoChirp interacts with your Instagram account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">API Settings</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="api-key">API Key</label>
                        <div className="flex">
                          <Input type="text" id="api-key" value="••••••••••••••••••••••••••••••" readOnly />
                          <Button variant="ghost" className="ml-2">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Your unique API key for external integrations</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="webhook">Webhook URL</label>
                        <div className="flex">
                          <Input type="text" id="webhook" placeholder="https://yourwebsite.com/webhook" />
                          <Button variant="ghost" className="ml-2">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Receive realtime updates at this URL</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Rate Limiting</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="msg-interval">Message Interval (seconds)</label>
                        <Input type="number" id="msg-interval" defaultValue="60" min="30" />
                        <p className="text-xs text-muted-foreground">Minimum time between automated messages</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="daily-limit">Daily Message Limit</label>
                        <Input type="number" id="daily-limit" defaultValue="50" min="1" max="100" />
                        <p className="text-xs text-muted-foreground">Maximum automated messages per day</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <div className="space-y-3">
                      {[
                        "Send email notifications for connection issues",
                        "Notify on automation rule execution",
                        "Daily summary reports",
                        "Alert when approaching message limits"
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <input type="checkbox" id={`notification-${i}`} defaultChecked={i < 2} className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor={`notification-${i}`} className="text-sm">{setting}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Connection History</CardTitle>
                <CardDescription>
                  Recent connection events and status changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="text-sm font-medium">Today</div>
                    </div>
                    <div className="border-t">
                      {[
                        {
                          event: "Account connected",
                          time: "10:42 AM",
                          details: "Instagram account @johndoe successfully connected",
                          status: "success"
                        },
                        {
                          event: "Auth token refreshed",
                          time: "10:45 AM", 
                          details: "Authentication credentials updated",
                          status: "info"
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b last:border-b-0">
                          <div className="flex items-center gap-4">
                            <div className={`rounded-full p-2 ${
                              item.status === "success" ? "bg-green-500/20 text-green-500" :
                              item.status === "error" ? "bg-red-500/20 text-red-500" :
                              "bg-blue-500/20 text-blue-500"
                            }`}>
                              {item.status === "success" ? (
                                <Check className="h-4 w-4" />
                              ) : item.status === "error" ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <RefreshCcw className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{item.event}</div>
                              <div className="text-sm text-muted-foreground">{item.details}</div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{item.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="text-sm font-medium">Yesterday</div>
                    </div>
                    <div className="border-t">
                      {[
                        {
                          event: "Connection attempt failed",
                          time: "3:21 PM",
                          details: "Connection attempt failed due to API rate limits",
                          status: "error"
                        },
                        {
                          event: "Account disconnected",
                          time: "2:15 PM",
                          details: "Instagram account manually disconnected",
                          status: "info"
                        },
                        {
                          event: "Connection settings updated",
                          time: "10:05 AM",
                          details: "API configuration changes applied",
                          status: "info"
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b last:border-b-0">
                          <div className="flex items-center gap-4">
                            <div className={`rounded-full p-2 ${
                              item.status === "success" ? "bg-green-500/20 text-green-500" :
                              item.status === "error" ? "bg-red-500/20 text-red-500" :
                              "bg-blue-500/20 text-blue-500"
                            }`}>
                              {item.status === "success" ? (
                                <Check className="h-4 w-4" />
                              ) : item.status === "error" ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <RefreshCcw className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{item.event}</div>
                              <div className="text-sm text-muted-foreground">{item.details}</div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{item.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Clear History</Button>
                <Button variant="outline">Export Logs</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
