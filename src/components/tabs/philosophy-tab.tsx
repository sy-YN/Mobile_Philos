
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { valuesItems } from '@/lib/company-philosophy';
import { Gem } from 'lucide-react';

export function PhilosophyTab() {
  const [todayValue, setTodayValue] = useState(valuesItems[0]);
  const [currentDate, setCurrentDate] = useState('');
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const date = new Date();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const valueIndex = dayOfYear % valuesItems.length;
    setTodayValue(valuesItems[valueIndex]);
    
    const formattedDate = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(date);
    setCurrentDate(formattedDate);
    
    // Animation effect
    setAnimationClass('animate-in fade-in duration-500');
    const timer = setTimeout(() => setAnimationClass(''), 500);
    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full text-center space-y-8">
      <div className={`w-full max-w-sm ${animationClass}`}>
        <div className="mb-4">
          <p className="text-muted-foreground">{currentDate}</p>
          <h1 className="text-2xl font-bold text-foreground font-headline">今日のPhilosophy</h1>
        </div>
        <Card className="shadow-2xl rounded-2xl overflow-hidden group">
          <CardContent className="p-8 bg-gradient-to-br from-card to-muted/30 relative">
            <Gem className="h-10 w-10 text-primary absolute -top-3 -left-3 opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary">{todayValue.title}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{todayValue.content}</p>
            </div>
            <Gem className="h-12 w-12 text-primary absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
          </CardContent>
        </Card>
      </div>
       <div className="text-xs text-muted-foreground">
        <p>毎日一つ、私たちの価値観を紹介します。</p>
        <p>日付が変わると、新しいPhilosophyが表示されます。</p>
      </div>
    </div>
  );
}
