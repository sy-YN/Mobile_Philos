
'use client';

import { useState, useEffect, useMemo } from 'react';
import { valuesItems } from '@/lib/company-philosophy';
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

export function PhilosophyTab() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const todaysPhilosophy = useMemo(() => {
    if (!isClient) {
      // During server-side rendering or initial client render, return a default.
      return valuesItems[0];
    }
    // Calculate day of the year to get a consistent daily value.
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    return valuesItems[day % valuesItems.length];
  }, [isClient]);

  const [selectedItem, setSelectedItem] = useState(todaysPhilosophy);

  // When todaysPhilosophy is determined on the client, update the selected item.
  useEffect(() => {
    if(isClient) {
        setSelectedItem(todaysPhilosophy);
    }
  }, [todaysPhilosophy, isClient]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-8 flex-1 overflow-y-auto pb-32">
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">今日の理念</h2>
          <Card 
            className="p-4 bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
            onClick={() => setSelectedItem(todaysPhilosophy)}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0">
                <todaysPhilosophy.icon className="w-10 h-10 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {todaysPhilosophy.title}
                </div>
                <p className="text-sm opacity-90 mt-1">{todaysPhilosophy.content.substring(0, 25)}...</p>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">行動指針</h2>
          <div className="grid grid-cols-2 gap-3">
            {valuesItems.map(item => (
              <Card 
                key={item.id}
                className={cn(
                  "p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/80 transition-colors text-card-foreground",
                  selectedItem.id === item.id && "bg-muted ring-2 ring-primary"
                )}
                onClick={() => setSelectedItem(item)}
              >
                <item.icon className="w-6 h-6 text-card-foreground/60 shrink-0" />
                <span className="font-semibold text-sm">{item.title}</span>
              </Card>
            ))}
          </div>
        </section>
      </div>
      
      {selectedItem && (
        <div className="absolute bottom-0 left-0 right-0 bg-card border-t p-4 rounded-t-3xl shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)] z-10 h-40">
          <div className="flex items-center gap-3 mb-3">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center shrink-0", selectedItem.iconBg)}>
                <selectedItem.icon className="w-7 h-7 text-primary-foreground" />
              </div>
            <h3 className="text-xl font-bold">{selectedItem.title}</h3>
          </div>
          <Separator className="my-2" />
          <ScrollArea className="h-16">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {selectedItem.content}
            </p>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
