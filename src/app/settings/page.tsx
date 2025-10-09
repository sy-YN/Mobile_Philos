
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Palette, Bell, Volume2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { AppShell } from '@/components/app-shell';
import { Slider } from '@/components/ui/slider';


export default function SettingsPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const darkModeValue = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModeValue);

    const savedVolume = localStorage.getItem('volume');
    if (savedVolume) {
      setVolume(Number(savedVolume));
    }
  }, []);

  const handleDarkModeChange = (enabled: boolean) => {
    setIsDarkMode(enabled);
    localStorage.setItem('darkMode', String(enabled));
    // This will force a re-render on the parent components that use this value
    window.dispatchEvent(new Event('storage'));
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    localStorage.setItem('volume', String(newVolume));
  };
  
  return (
    <div className={cn("min-h-screen bg-background", isDarkMode && 'dark')}>
        <AppShell>
            <div className="flex flex-col h-full">
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
                        <div className="space-y-3">
                            <Label htmlFor="volume-slider" className="flex items-center gap-3">
                                <Volume2 className="w-5 h-5 text-primary" />
                                <span className="text-base font-medium">音量</span>
                            </Label>
                            <div className="flex items-center gap-4">
                              <Slider
                                  id="volume-slider"
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[volume]}
                                  onValueChange={handleVolumeChange}
                              />
                              <span className="text-sm font-mono w-10 text-right">{volume}%</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppShell>
    </div>
  );
}
