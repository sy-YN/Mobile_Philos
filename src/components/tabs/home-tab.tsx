
'use client';
import { useState, useEffect } from "react";
import { VideoPlayer } from "@/components/video-player";
import { ExecutiveMessageCard } from "@/components/executive-message-card";
import { Building2 } from "lucide-react";

const executiveMessages = [
  {
    id: 1,
    author: "田中, CEO",
    avatar: "https://picsum.photos/seed/ceo/100/100",
    title: "第4四半期の戦略",
    preview: "次の四半期の主要な施策について説明します...",
    time: "2時間前",
    priority: "high" as const,
  },
  {
    id: 2,
    author: "佐藤, CTO",
    avatar: "https://picsum.photos/seed/cto/100/100",
    title: "DX推進の進捗",
    preview: "デジタルトランスフォーメーションの現状と今後の計画...",
    time: "1日前",
    priority: "medium" as const,
  },
];

export function HomeTab() {
  const [showAnimatedContent, setShowAnimatedContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimatedContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div
        className={`transition-all duration-700 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <div className="h-[240px] w-full">
          <VideoPlayer />
        </div>
      </div>
      
      <section
        className={`transition-all duration-700 delay-200 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          経営層からのメッセージ
        </h2>
        <div className="space-y-3">
          {executiveMessages.map((message, index) => (
            <ExecutiveMessageCard 
              key={message.id} 
              message={message}
              className={`transition-all duration-500 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
