
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
    setShowAnimation(true);
  }, []);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the main click handler from firing
    setIsLiked(!isLiked);
    setLikes(l => isLiked ? l - 1 : l + 1);
  };
  
  const handlePageFlip = () => {
    setIsExiting(true);
    setTimeout(onNavigateHome, 500); // Match animation duration
  };

  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}(${dayOfWeek})`;

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center h-full p-8 cursor-pointer transition-all duration-500 ease-in-out",
        showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-110',
        isExiting && 'opacity-0 scale-90'
      )}
      onClick={handlePageFlip}
    >
      <div className="text-center w-full flex-grow flex flex-col justify-center">
        <p className="text-2xl text-primary mb-12 font-sans tracking-widest">
          {formattedDate}
        </p>

        <h1 className="text-6xl font-bold text-primary mb-4 font-headline">
          {currentValue.title.split('. ')[1]}
        </h1>

        <p className="text-base text-muted-foreground mb-16">
          〜{currentValue.content}〜
        </p>

        <div className="flex flex-col items-center gap-2">
          <button onClick={handleLike} className="transition-transform transform active:scale-125">
            <ThumbsUp className={cn("h-10 w-10 text-primary", isLiked && "fill-primary")} />
          </button>
          <span className="text-xl font-bold text-primary">{likes}</span>
        </div>
      </div>
    </div>
  );
}

