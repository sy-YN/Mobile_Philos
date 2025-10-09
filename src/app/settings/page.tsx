
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Palette, Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export default function SettingsPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const darkModeValue = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModeValue);

    const notificationsValue = localStorage.getItem('notificationsEnabled') !== 'false';
    setNotificationsEnabled(notificationsValue);
  }, []);

  const handleDarkModeChange = (enabled: boolean) => {
    setIsDarkMode(enabled);
    localStorage.setItem('darkMode', String(enabled));
    window.dispatchEvent(new Event('storage'));
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    localStorage.setItem('notificationsEnabled', String(enabled));
  };

  return (
    <div className={cn("min-h-screen bg-background", isDarkMode && 'dark')}>
      <div className="flex flex-col h-screen">
        <header className="px-4 py-3 flex items-center border-b shrink-0 sticky top-0 bg-background/95 backdrop-blur-sm z-10 pt-8">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">戻る</span>
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-base font-semibold text-foreground">設定</h1>
          </div>
          <div className="w-8"></div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <Card className="p-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode-switch" className="flex items-center gap-3">
                        <Palette className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium">ダークモード</span>
                    </Label>
                    <Switch
                        id="dark-mode-switch"
                        checked={isDarkMode}
                        onCheckedChange={handleDarkModeChange}
                    />
                </div>
            </Card>
            <Card className="p-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                    <Label htmlFor="notification-switch" className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium">プッシュ通知</span>
                    </Label>
                    <Switch
                        id="notification-switch"
                        checked={notificationsEnabled}
                        onCheckedChange={handleNotificationsChange}
                    />
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
