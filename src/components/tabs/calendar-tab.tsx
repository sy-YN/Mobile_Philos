
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { valuesItems } from '@/lib/company-philosophy';
import { Calendar as CalendarIcon, Star, Sparkles } from 'lucide-react';

export function CalendarTab() {
  const [today, setToday] = useState(new Date());
  const [currentValue, setCurrentValue] = useState(valuesItems[0]);

  useEffect(() => {
    const date = new Date();
    setToday(date);
    // Cycle through values based on the day of the month
    const valueIndex = (date.getDate() - 1) % valuesItems.length;
    setCurrentValue(valuesItems[valueIndex]);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="text-center pt-4">
        <h2 className="text-xl font-bold text-foreground font-headline flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          今日のひとこと！
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          {today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <Card className="bg-gradient-to-br from-accent/20 to-transparent border-accent/50 shadow-lg">
        <CardHeader className="p-6 pb-4 text-center">
          <CardTitle className="text-2xl font-bold font-headline text-accent leading-tight">
            {currentValue.title.split('. ')[1]}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-card-foreground/90 text-center">{currentValue.content}</p>
        </CardContent>
      </Card>
      
       <div className="pt-4">
        <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          私たちの価値観 (Values)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
           {valuesItems.map((item, index) => (
            <Card 
              key={item.id} 
              className={`p-3 text-xs transition-all ${currentValue.id === item.id ? 'bg-accent/20 border-accent/50 scale-105' : 'bg-card/50'}`}
            >
              <p className="font-semibold text-card-foreground mb-1">{item.title}</p>
              <p className="text-muted-foreground">{item.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
