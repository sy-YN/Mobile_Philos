
'use client';

import { useState, useEffect, useMemo } from 'react';
import { valuesItems } from '@/lib/company-philosophy';
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function PhilosophyTab() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const todaysPhilosophy = useMemo(() => {
    if (!isClient) {
      // Return a default or skeleton value on the server
      return valuesItems[0];
    }
    // This logic now only runs on the client
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return valuesItems[dayOfYear % valuesItems.length];
  }, [isClient]);

  return (
    <div className="p-4 space-y-8">
      <section>
        <Sheet>
          <SheetTrigger asChild>
            <Card className="p-4 bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors">
              <div className="text-sm font-semibold mb-3 opacity-80">今日の理念</div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <todaysPhilosophy.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="text-2xl font-bold">
                  {todaysPhilosophy.title}し続ける
                </div>
              </div>
            </Card>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[80vh]">
            <SheetHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", todaysPhilosophy.iconBg)}>
                  <todaysPhilosophy.icon className="w-6 h-6 text-white" />
                </div>
                <SheetTitle className="text-2xl">{todaysPhilosophy.title}</SheetTitle>
              </div>
              <SheetDescription className="pt-2 text-base leading-relaxed text-left">
                {todaysPhilosophy.content}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-3">
          {valuesItems.map(item => (
            <Sheet key={item.id}>
              <SheetTrigger asChild>
                <Card className="p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/80 transition-colors">
                  <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", item.iconBg)}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold">{item.title}</span>
                </Card>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[80vh]">
                <SheetHeader>
                  <div className="flex items-center gap-3 mb-2">
                     <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", item.iconBg)}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                    <SheetTitle className="text-2xl">{item.title}</SheetTitle>
                  </div>
                  <SheetDescription className="pt-2 text-base leading-relaxed text-left">
                    {item.content}
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>
    </div>
  );
}
