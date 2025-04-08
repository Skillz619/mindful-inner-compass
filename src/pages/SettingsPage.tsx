
import Layout from '@/components/Layout';
import PrivacySettings from '@/components/PrivacySettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sliders, Bell, Shield, UserCircle, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Settings</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Customize your experience and privacy preferences
            </p>
          </div>
        </section>

        <Tabs defaultValue="privacy" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" /> General
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gradient flex items-center gap-2">
                  <Sliders className="h-6 w-6" />
                  General Settings
                </CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark theme
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="profile-visibility" className="font-medium">Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your profile in the community
                    </p>
                  </div>
                  <Switch
                    id="profile-visibility"
                    defaultChecked={false}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="sound-effects" className="font-medium">Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable sound effects in the app
                    </p>
                  </div>
                  <Switch
                    id="sound-effects"
                    defaultChecked={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="animate-fade-in">
            <PrivacySettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gradient flex items-center gap-2">
                  <Bell className="h-6 w-6" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="enable-notifications" className="font-medium">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders and updates about your mental wellness
                    </p>
                  </div>
                  <Switch
                    id="enable-notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="daily-reminders" className="font-medium">Daily Check-in Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded to track your mood daily
                    </p>
                  </div>
                  <Switch
                    id="daily-reminders"
                    defaultChecked={true}
                    disabled={!notifications}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="community-notifications" className="font-medium">Community Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about replies to your posts
                    </p>
                  </div>
                  <Switch
                    id="community-notifications"
                    defaultChecked={true}
                    disabled={!notifications}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="pet-notifications" className="font-medium">Virtual Pet Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your pet needs attention
                    </p>
                  </div>
                  <Switch
                    id="pet-notifications"
                    defaultChecked={true}
                    disabled={!notifications}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
