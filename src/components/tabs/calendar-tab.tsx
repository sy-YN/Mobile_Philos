

'use client';

import { useState, useEffect } from 'react';
import { valuesItems } from '@/lib/company-philosophy';
import { ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalendarTabProps = {
  onNavigateHome: () => void;
  show: boolean;
};

export function CalendarTab({ onNavigateHome, show }: CalendarTabProps) {
  const [today, setToday] = useState(new Date());
  const [currentValue, setCurrentValue] = useState(valuesItems[0]);
  const [likes, setLikes] = useState(111);
  const [isLiked, setIsLiked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setIsExiting(false);
      const date = new Date();
      setToday(date);
      const valueIndex = (date.getDate() - 1) % valuesItems.length;
      setCurrentValue(valuesItems[valueIndex]);
    }
  }, [show]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(l => isLiked ? l - 1 : l + 1);
  };
  
  const handlePageFlip = () => {
    setIsExiting(true);
    setTimeout(onNavigateHome, 700); 
  };

  const dayOfWeek = today.toLocaleDateString('ja-JP', { weekday: 'long' });
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const year = today.getFullYear();

  if (!show) {
    return null;
  }

  return (
    <div 
      className={cn(
        "absolute inset-0 z-30 flex flex-col items-center justify-center p-4 cursor-pointer bg-muted transition-opacity duration-300",
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={handlePageFlip}
    >
      <div 
        className={cn("relative w-full max-w-sm h-[600px] transition-transform duration-700 ease-in-out", isExiting && "scale-125")}
        style={{ perspective: '1000px' }}
      >
        {/* Stacked pages */}
        <div className="absolute inset-0 bg-card rounded-lg shadow-lg rotate-[-4deg]"></div>
        <div className="absolute inset-0 bg-card rounded-lg shadow-lg rotate-[3deg]"></div>

        <div className={cn(
          "absolute inset-0 w-full h-full bg-card rounded-lg shadow-2xl flex flex-col p-8 transition-transform duration-700 ease-in-out font-serif",
          isExiting && 'transform-style-3d rotate-y-[-120deg] scale-75'
        )}
        style={{ transformOrigin: 'left center' }}
        >
          {/* Rings */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-4">
            <div className="w-3 h-3 rounded-full bg-muted ring-2 ring-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-muted ring-2 ring-gray-400"></div>
          </div>

          <header className="text-center pt-8 border-b-2 border-muted pb-4">
            <p className="text-lg font-medium text-muted-foreground tracking-widest">{dayOfWeek}</p>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-8xl font-bold text-foreground tracking-tighter">{day}</p>
            <p className="text-2xl font-medium text-muted-foreground -mt-2">{month}, {year}</p>
            
            <div className="my-10">
              <h1 className="text-4xl font-bold text-foreground mb-3 leading-snug">
                {currentValue.title.split('. ')[1]}
              </h1>
              <p className="text-base text-muted-foreground px-4 leading-relaxed">
                〜{currentValue.content}〜
              </p>
            </div>
          </main>

          <footer className="text-center">
            <div className="flex flex-col items-center gap-2 drop-shadow-sm">
              <button onClick={handleLike} className="transition-transform transform active:scale-125">
                <ThumbsUp className={cn("h-8 w-8 text-muted-foreground", isLiked && "fill-primary text-primary")} />
              </button>
              <span className="text-lg font-bold text-muted-foreground">{likes}</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
