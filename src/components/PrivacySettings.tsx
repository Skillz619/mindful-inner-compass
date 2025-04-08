
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Eye, EyeOff, Trash2 } from 'lucide-react';

interface PrivacySettings {
  anonymousMode: boolean;
  encryptData: boolean;
  autoDeleteAfterDays: number | null;
  showMoodHistory: boolean;
}

const PrivacySettings = () => {
  const [settings, setSettings] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('privacySettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {
          anonymousMode: false,
          encryptData: true,
          autoDeleteAfterDays: null,
          showMoodHistory: true
        };
      }
    }
    return {
      anonymousMode: false,
      encryptData: true,
      autoDeleteAfterDays: null,
      showMoodHistory: true
    };
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('privacySettings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key: keyof PrivacySettings, value: any) => {
    setSettings({
      ...settings,
      [key]: value
    });
    
    toast({
      title: "Settings updated",
      description: "Your privacy settings have been saved.",
    });
  };

  const handleClearAllData = () => {
    if (confirm("Are you sure you want to clear all your data? This action cannot be undone.")) {
      // Clear all app data
      localStorage.removeItem('journalEntries');
      localStorage.removeItem('virtualPet');
      localStorage.removeItem('communityPosts');
      
      toast({
        title: "Data cleared",
        description: "All your data has been deleted.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Privacy Settings
        </CardTitle>
        <CardDescription>Control how your data is stored and used</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Label htmlFor="anonymous-mode" className="font-medium">Anonymous Mode</Label>
            <p className="text-sm text-muted-foreground">
              Use the app without saving your identity or personal information
            </p>
          </div>
          <Switch
            id="anonymous-mode"
            checked={settings.anonymousMode}
            onCheckedChange={(checked) => updateSetting('anonymousMode', checked)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <Label htmlFor="encrypt-data" className="font-medium">End-to-End Encryption</Label>
            <p className="text-sm text-muted-foreground">
              Encrypt your data for maximum privacy and security
            </p>
          </div>
          <Switch
            id="encrypt-data"
            checked={settings.encryptData}
            onCheckedChange={(checked) => updateSetting('encryptData', checked)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <Label htmlFor="show-mood" className="font-medium">Show Mood History</Label>
            <p className="text-sm text-muted-foreground">
              Allow your mood history to be visible on your profile
            </p>
          </div>
          <Switch
            id="show-mood"
            checked={settings.showMoodHistory}
            onCheckedChange={(checked) => updateSetting('showMoodHistory', checked)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="auto-delete" className="font-medium">Auto-Delete Data</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Automatically delete your data after a specified period
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={settings.autoDeleteAfterDays === null ? "default" : "outline"}
              onClick={() => updateSetting('autoDeleteAfterDays', null)}
              size="sm"
            >
              Never
            </Button>
            <Button 
              variant={settings.autoDeleteAfterDays === 30 ? "default" : "outline"}
              onClick={() => updateSetting('autoDeleteAfterDays', 30)}
              size="sm"
            >
              30 Days
            </Button>
            <Button 
              variant={settings.autoDeleteAfterDays === 90 ? "default" : "outline"}
              onClick={() => updateSetting('autoDeleteAfterDays', 90)}
              size="sm"
            >
              90 Days
            </Button>
            <Button 
              variant={settings.autoDeleteAfterDays === 365 ? "default" : "outline"}
              onClick={() => updateSetting('autoDeleteAfterDays', 365)}
              size="sm"
            >
              1 Year
            </Button>
          </div>
        </div>
        
        <div className="pt-6 border-t">
          <Button 
            variant="destructive" 
            className="w-full flex items-center gap-2"
            onClick={handleClearAllData}
          >
            <Trash2 className="h-4 w-4" />
            Clear All Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This will permanently delete all your data from this device.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettings;
