
'use client';
import { useState, useEffect } from "react";
import { VideoPlayer } from "@/components/video-player";
import { ExecutiveMessageCard } from "@/components/executive-message-card";
import { Building2, MessageSquare } from "lucide-react";
import { BoardPostForm } from "../board-post-form";
import { BoardPostCard } from "../board-post-card";
import type { Post } from "@/app/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const initialPosts: Post[] = [
  {
    id: 1,
    author: '山田さん',
    avatar: 'https://picsum.photos/seed/p1/100/100',
    title: '全社ミーティングの感想',
    content: 'CEOのメッセージ、非常に感銘を受けました。特にDXの推進に関する部分は、今後の会社の成長に不可欠だと感じています。',
    likes: 12,
    comments: 3,
    time: '1時間前'
  },
  {
    id: 2,
    author: '鈴木さん',
    avatar: 'https://picsum.photos/seed/p2/100/100',
    title: 'ビデオを見て',
    content: '動画、とても分かりやすかったです！倍速機能も便利ですね。',
    likes: 8,
    comments: 1,
    time: '3時間前'
  }
];


export function HomeTab() {
  const [showAnimatedContent, setShowAnimatedContent] = useState(false);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string[]>([]);


  const handlePostCreated = (post: Post) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimatedContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVideoPlaying) {
      setOpenAccordion(["comments"]);
    }
  }, [isVideoPlaying]);

  return (
    <div className="p-4 space-y-6">
      <div
        className={`transition-all duration-700 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <div className="h-[240px] w-full">
          <VideoPlayer onPlayStateChange={setIsVideoPlaying} />
        </div>
      </div>

      <Accordion type="multiple" value={openAccordion} onValueChange={setOpenAccordion} className="w-full">
        <AccordionItem value="comments">
          <AccordionTrigger className="text-base font-medium hover:no-underline justify-start gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>コメント</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 space-y-4">
             <section
              className={`transition-all duration-700 delay-100 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            >
              <BoardPostForm onPostCreated={handlePostCreated} />
            </section>

            <section
              className={`transition-all duration-700 delay-200 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            >
              <div className="space-y-3">
                {posts.map(post => (
                  <BoardPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <section
        className={`transition-all duration-700 delay-300 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
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
