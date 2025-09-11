
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { valuesItems } from '@/lib/company-philosophy';
import { Calendar, Lightbulb } from 'lucide-react';

export function PhilosophyTab() {
  const [currentValue, setCurrentValue] = useState({ title: '', content: '' });
  const [today, setToday] = useState('');

  useEffect(() => {
    const date = new Date();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const valueIndex = (dayOfYear - 1) % valuesItems.length;
    setCurrentValue(valuesItems[valueIndex]);

    const formattedDate = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
    const dayOfWeek = new Intl.DateTimeFormat('ja-JP', { weekday: 'long' }).format(date);
    setToday(`${formattedDate} (${dayOfWeek})`);

  }, []);

  return (
    <div className="p-4 space-y-6 h-full flex flex-col items-center justify-center bg-muted/20">
      <Card className="w-full max-w-sm shadow-lg animate-in fade-in-50 zoom-in-95 duration-500">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{today}</span>
          </div>
          <CardTitle className="text-xl font-bold text-primary pt-2">今日の理念</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-6 pt-0">
          <div className="p-6 bg-accent/10 rounded-lg">
            <h3 className="text-lg font-bold text-accent-foreground mb-3 flex items-center justify-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              {currentValue.title}
            </h3>
            <p className="text-base leading-relaxed text-foreground/80">{currentValue.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
