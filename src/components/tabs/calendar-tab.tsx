

'use client';

import { useState, useEffect } from 'react';
import { valuesItems } from '@/lib/company-philosophy';
import { ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalendarTabProps = {
  onNavigateHome: () => void;
};

export function CalendarTab({ onNavigateHome }: CalendarTabProps) {
  const [today, setToday] = useState(new Date());
  const [currentValue, setCurrentValue] = useState(valuesItems[0]);
  const [likes, setLikes] = useState(111);
  const [isLiked, setIsLiked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const date = new Date();
    setToday(date);
    const valueIndex = (date.getDate() - 1) % valuesItems.length;
    setCurrentValue(valuesItems[valueIndex]);
    
    // Enter animation
    const timer = setTimeout(() => setShowAnimation(true), 10); // small delay to ensure transition triggers
    return () => clearTimeout(timer);
  }, []);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(l => isLiked ? l - 1 : l + 1);
  };
  
  const handlePageFlip = () => {
    setIsExiting(true);
    setTimeout(onNavigateHome, 400); 
  };

  const dayOfWeek = today.toLocaleDateString('ja-JP', { weekday: 'long' });
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const year = today.getFullYear();

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center h-full p-4 cursor-pointer bg-muted transition-opacity duration-300",
        showAnimation ? 'opacity-100' : 'opacity-0',
        isExiting && 'opacity-0'
      )}
      onClick={handlePageFlip}
    >
      <div className={cn(
        "w-full max-w-[320px] h-[550px] bg-card rounded-lg shadow-2xl flex flex-col p-8 relative transition-transform duration-300 ease-in-out font-serif",
        showAnimation ? 'scale-100' : 'scale-95',
        isExiting && 'scale-95 -rotate-3'
      )}>
        {/* Rings */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-4">
          <div className="w-3 h-3 rounded-full bg-muted ring-2 ring-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-muted ring-2 ring-gray-400"></div>
        </div>

        <header className="text-center pt-8 border-b-2 border-muted pb-4">
          <p className="text-lg font-medium text-primary">{dayOfWeek}</p>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-8xl font-bold text-foreground tracking-tighter">{day}</p>
          <p className="text-2xl font-medium text-muted-foreground -mt-2">{month}, {year}</p>
          
          <div className="my-10">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {currentValue.title.split('. ')[1]}
            </h1>
            <p className="text-sm text-muted-foreground px-4 leading-relaxed">
              〜{currentValue.content}〜
            </p>
          </div>
        </main>

        <footer className="text-center">
          <div className="flex flex-col items-center gap-2">
            <button onClick={handleLike} className="transition-transform transform active:scale-125">
              <ThumbsUp className={cn("h-8 w-8 text-muted-foreground", isLiked && "fill-primary text-primary")} />
            </button>
            <span className="text-base font-bold text-muted-foreground">{likes}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
