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
      return valuesItems[0];
    }
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return valuesItems[dayOfYear % valuesItems.length];
  }, [isClient]);

  const [selectedItem, setSelectedItem] = useState(todaysPhilosophy);

  useEffect(() => {
    setSelectedItem(todaysPhilosophy);
  }, [todaysPhilosophy]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-8 flex-1 overflow-y-auto">
        <section>
          <Card 
            className="p-4 bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => setSelectedItem(todaysPhilosophy)}
          >
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
        </section>

        <section>
          <div className="grid grid-cols-2 gap-3">
            {valuesItems.map(item => (
              <Card 
                key={item.id}
                className={cn(
                  "p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/80 transition-colors",
                  selectedItem.id === item.id && "bg-muted/80 ring-2 ring-primary"
                )}
                onClick={() => setSelectedItem(item)}
              >
                <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", item.iconBg)}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold">{item.title}</span>
              </Card>
            ))}
          </div>
        </section>
      </div>
      
      {selectedItem && (
        <div className="bg-card border-t p-4 rounded-t-2xl shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 mb-3">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", selectedItem.iconBg)}>
                <selectedItem.icon className="w-7 h-7 text-white" />
              </div>
            <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
          </div>
          <Separator className="my-2" />
          <p className="text-base leading-relaxed text-muted-foreground h-24 overflow-y-auto">
            {selectedItem.content}
          </p>
        </div>
      )}
    </div>
  );
}
