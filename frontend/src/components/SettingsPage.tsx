import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { User, Bell, Shield, Key, Save, Trash2, Moon, Sun, LockIcon, Mail, LogOut, Smartphone, Loader2 } from "lucide-react";

interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

// User service with API integration
const userService = {
  async getUserProfile(): Promise<UserProfile> {
    try {
      // In a real app, this would be an actual API call
      // const response = await fetch('/api/user/profile');
      // if (!response.ok) throw new Error('Failed to fetch user profile');
      // return await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock data
      return {
        id: "usr_123456",
        fullName: "John Doe",
        username: "johndoe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
  
  async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      // In a real app, this would be an actual API call
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) throw new Error('Failed to update user profile');
      // return await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return updated mock data
      return {
        id: "usr_123456",
        fullName: data.fullName || "John Doe",
        username: data.username || "johndoe",
        email: data.email || "john.doe@example.com",
        phone: data.phone || "+1 (555) 123-4567", 
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (data.fullName || "John")
      };
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
  
  async deleteUserAccount(): Promise<void> {
    try {
      // In a real app, this would be an actual API call
      // const response = await fetch('/api/user/account', {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error('Failed to delete account');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return;
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw error;
    }
  }
};

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch user profile data from the API
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const userData = await userService.getUserProfile();
        setUserProfile(userData);
        setFormData(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const updatedProfile = await userService.updateUserProfile(formData);
      
      // Update local state with the response data
      setUserProfile(updatedProfile);
      setFormData(updatedProfile);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await userService.deleteUserAccount();
      
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
      
      // In a real app, you would redirect to a logout page or home page
      // window.location.href = "/";
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          {!isLoading && userProfile && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.fullName} />
                <AvatarFallback>{userProfile.fullName.split(' ').map(n => n[0]).join('') || 'JD'}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <span className="font-medium">{userProfile.fullName}</span>
                <p className="text-xs text-muted-foreground">@{userProfile.username}</p>
              </div>
            </div>
          )}
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
                {isLoading ? (
                  <>
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <Skeleton className="h-24 w-24 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                        <div className="flex gap-2 mt-2">
                          <Skeleton className="h-9 w-28" />
                          <Skeleton className="h-9 w-20" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="space-y-2">
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={userProfile?.avatarUrl} alt={userProfile?.fullName} />
                        <AvatarFallback>{userProfile?.fullName?.split(' ').map(n => n[0]).join('') || 'JD'}</AvatarFallback>
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
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          name="fullName"
                          value={formData.fullName || ''} 
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username"
                          name="username" 
                          value={formData.username || ''} 
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          value={formData.email || ''} 
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          type="tel" 
                          value={formData.phone || ''} 
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  disabled={isLoading || isSaving}
                  onClick={() => setFormData(userProfile || {})}
                >
                  Reset
                </Button>
                <Button 
                  className="gap-2" 
                  onClick={handleSaveProfile} 
                  disabled={isLoading || isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
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
                <Button 
                  variant="destructive" 
                  className="gap-2 mt-2" 
                  disabled={isLoading || isDeleting}
                  onClick={handleDeleteAccount}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </>
                  )}
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