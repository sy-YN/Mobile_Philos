
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { valuesItems } from '@/lib/company-philosophy';
import { Calendar, Sparkles } from 'lucide-react';

export function PhilosophyTab() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // This component should reflect the current date.
    // Setting it in useEffect ensures it runs only on the client
    // and avoids server/client mismatch.
    setCurrentDate(new Date());
  }, []);

  const dailyValue = useMemo(() => {
    // Get the day of the year (0-365)
    const start = new Date(currentDate.getFullYear(), 0, 0);
    const diff = currentDate.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use modulo to cycle through the values
    const index = (dayOfYear - 1) % valuesItems.length;
    return valuesItems[index];
  }, [currentDate]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(currentDate);
  }, [currentDate]);

  return (
    <div className="p-4 flex flex-col h-full bg-gradient-to-br from-background to-muted/30">
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-sm shadow-2xl bg-card/80 backdrop-blur-sm border-border/20 transform hover:scale-[1.02] transition-transform duration-500">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <CardTitle className="text-primary text-lg flex items-center gap-2 pt-2">
              <Sparkles className="w-5 h-5" />
              今日のPhilosophy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20 text-center">
              <h3 className="text-lg font-bold text-accent mb-3">{dailyValue.title}</h3>
              <p className="text-base text-foreground/90 whitespace-pre-line leading-relaxed">
                {dailyValue.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
