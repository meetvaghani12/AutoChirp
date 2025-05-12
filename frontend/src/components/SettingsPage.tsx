import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Layout } from "./Sidebar";
import { User, Bell, Shield, Key, Save, Trash2, Moon, Sun, LockIcon, Mail, LogOut, Smartphone } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              Appearance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Change Picture</Button>
                      <Button size="sm" variant="outline" className="text-destructive">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@johndoe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Tell us a bit about yourself"
                      defaultValue="Marketing manager at Company Inc. Love to automate my Instagram content."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="text-destructive">
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions that affect your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" className="gap-2 mt-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what types of notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="grid gap-3">
                    {[
                      { label: "Automation summaries", defaultChecked: true },
                      { label: "New followers", defaultChecked: true },
                      { label: "Account alerts", defaultChecked: true },
                      { label: "Marketing and updates", defaultChecked: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <span>{item.label}</span>
                        </div>
                        <Switch defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Push Notifications</h3>
                  <div className="grid gap-3">
                    {[
                      { label: "Automation activity", defaultChecked: true },
                      { label: "Message responses", defaultChecked: true },
                      { label: "Account activity", defaultChecked: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <span>{item.label}</span>
                        </div>
                        <Switch defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Password & Authentication</CardTitle>
                <CardDescription>
                  Update your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto" variant="outline">Update Password</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Active Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your active login sessions
                      </p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <LogOut className="h-4 w-4" />
                      Log Out All Devices
                    </Button>
                  </div>
                  <div className="rounded-md border">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/20 p-2">
                          <LockIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-muted-foreground">Windows 10 • Chrome Browser</div>
                        </div>
                      </div>
                      <Badge>Active Now</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how AutoChirp looks for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="flex items-center gap-8">
                    <div
                      className={`flex cursor-pointer flex-col items-center gap-2 ${!darkMode ? "opacity-100" : "opacity-60"}`}
                      onClick={() => setDarkMode(false)}
                    >
                      <div className="rounded-md border-2 border-primary/30 p-2 bg-background shadow-sm h-20 w-24 flex items-center justify-center">
                        <Sun className="h-8 w-8 text-orange-500" />
                      </div>
                      <span className="text-sm font-medium">Light</span>
                    </div>
                    
                    <div
                      className={`flex cursor-pointer flex-col items-center gap-2 ${darkMode ? "opacity-100" : "opacity-60"}`}
                      onClick={() => setDarkMode(true)}
                    >
                      <div className="rounded-md border-2 border-primary/30 p-2 bg-zinc-900 shadow-sm h-20 w-24 flex items-center justify-center">
                        <Moon className="h-8 w-8 text-indigo-400" />
                      </div>
                      <span className="text-sm font-medium">Dark</span>
                    </div>
                    
                    <div className="flex cursor-pointer flex-col items-center gap-2 opacity-60">
                      <div className="rounded-md border border-dashed border-muted-foreground/70 p-2 bg-background shadow-sm h-20 w-24 flex items-center justify-center">
                        <svg className="h-8 w-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.094 21.8795 10.2164 21.6537 9.38232C20.6859 11.5362 18.7604 13.0747 16.4118 13.5041C16.7205 12.7188 16.8926 11.8687 16.8926 10.9808C16.8926 7.13031 13.5105 4 9.44629 4C7.97082 4 6.60437 4.41485 5.45286 5.12602C6.33461 3.21617 8.04484 1.71258 10.1117 1.16635C10.7244 1.05526 11.3543 1 12 1C17.5228 1 22 5.47715 22 11C22 16.5228 17.5228 21 12 21C6.47715 21 2 16.5228 2 11C2 10.6494 2.01929 10.303 2.05666 9.96209C2.6575 11.702 4.42539 12.9808 6.50439 12.9808C8.67632 12.9808 10.5 11.3996 10.7652 9.32363C11.4241 9.6866 12.1893 9.89485 13.0001 9.89485C15.483 9.89485 17.5 7.91414 17.5 5.44743C17.5 4.37079 17.1347 3.38346 16.5334 2.59258C20.9398 3.79167 24 7.58722 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C12.6906 0 13.3666 0.0549498 14.0235 0.160581C10.6041 1.39258 8.11736 4.59996 8.11736 8.36255C8.11736 12.482 11.4285 15.8614 15.5 15.8614C19.5715 15.8614 22.8826 12.482 22.8826 8.36255C22.8826 7.55258 22.7657 6.77048 22.5473 6.03258C23.4636 7.81318 24 9.84194 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">System</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sidebar Settings</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span>Auto-collapse sidebar on small screens</span>
                      <p className="text-sm text-muted-foreground">
                        Automatically collapse sidebar when viewport is narrow
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
} 