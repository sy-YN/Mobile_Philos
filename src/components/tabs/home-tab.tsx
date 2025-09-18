
'use client';
import { useState, useEffect } from "react";
import { VideoPlayer } from "@/components/video-player";
import { ExecutiveMessageCard } from "@/components/executive-message-card";
import { Building2, MessageSquare } from "lucide-react";
import { BoardPostForm } from "../board-post-form";
import { BoardPostCard } from "../board-post-card";
import type { Post } from "@/app/actions";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  },
  {
    id: 3,
    author: '伊藤さん',
    avatar: 'https://picsum.photos/seed/p3/100/100',
    title: '未来への期待',
    content: '新しいビジョンにワクワクしています。私たち一人ひとりがどう貢献できるか、考えていきたいです。',
    likes: 25,
    comments: 7,
    time: '5時間前'
  },
];


export function HomeTab() {
  const [showAnimatedContent, setShowAnimatedContent] = useState(false);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handlePostCreated = (post: Post) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

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

      <section className="space-y-4">
        <h2 className="text-base font-medium flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>コメント</span>
        </h2>
        
        <BoardPostForm onPostCreated={handlePostCreated} />

        <div
          className={`transition-all duration-700 delay-200 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3">
              {posts.map(post => (
                <BoardPostCard key={post.id} post={post} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>
      
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
