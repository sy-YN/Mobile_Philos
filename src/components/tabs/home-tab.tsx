
'use client';
import { useState, useEffect } from "react";
import { VideoPlayer } from "@/components/video-player";
import { ExecutiveMessageCard } from "@/components/executive-message-card";
import { Building2, MessageSquare } from "lucide-react";
import { BoardPostForm } from "../board-post-form";
import { BoardPostCard } from "../board-post-card";
import type { Post } from "@/app/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "../ui/badge";

const executiveMessages = [
  {
    id: 1,
    author: "田中, CEO",
    avatar: "https://picsum.photos/seed/ceo/100/100",
    title: "第4四半期の戦略",
    preview: "次の四半期の主要な施策について説明します...",
    time: "2時間前",
    priority: "high" as const,
    fullContent: "社員の皆様、こんにちは。CEOの田中です。第3四半期も皆様の尽力のおかげで、素晴らしい成果を上げることができました。誠にありがとうございます。\n\nさて、来る第4四半期に向けて、私たちは3つの主要な戦略的柱に焦点を当てます。第一に「顧客中心主義の徹底」、第二に「デジタルトランスフォーメーションの加速」、そして第三に「持続可能な成長への投資」です。各部門でこれらの戦略がどのように実行されるか、具体的な計画については来週の全社ミーティングで詳しく説明します。未来へ向けて、一丸となって挑戦し続けましょう。"
  },
  {
    id: 2,
    author: "佐藤, CTO",
    avatar: "https://picsum.photos/seed/cto/100/100",
    title: "DX推進の進捗",
    preview: "デジタルトランスフォーメーションの現状と今後の計画...",
    time: "1日前",
    priority: "medium" as const,
    fullContent: "CTOの佐藤です。現在進行中のDXプロジェクトについてご報告します。先月、新しい社内コミュニケーションツールを導入し、多くのチームで活用が進んでいます。また、データ分析基盤の構築も順調に進んでおり、年末までには第一弾のダッシュボードをリリースできる見込みです。\n\n今後は、AIを活用した業務効率化ツールの試験導入も計画しています。これらの取り組みを通じて、より創造的で生産性の高い働き方を実現していきたいと考えています。ご意見やフィードバックがあれば、ぜひお聞かせください。"
  },
];

const videos = [
  {
    id: 1,
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: '第4四半期 全社ミーティング',
    subtitle: 'CEOからのメッセージ',
  },
  {
    id: 2,
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'デザインチームより',
    subtitle: '新プロダクトのコンセプト紹介',
  },
  {
    id: 3,
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'エンジニアチームより',
    subtitle: 'ベータ版新機能のデモ',
  },
]

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
        <Carousel>
          <CarouselContent>
            {videos.map(video => (
              <CarouselItem key={video.id}>
                <div className="h-[240px] w-full">
                  <VideoPlayer 
                    src={video.src}
                    title={video.title}
                    subtitle={video.subtitle}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-3">
            {executiveMessages.map((message, index) => (
               <Dialog key={message.id}>
                <DialogTrigger asChild>
                  <ExecutiveMessageCard 
                    message={message}
                    className={`transition-all duration-500 ${showAnimatedContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md">
                  <DialogHeader>
                    <div className="flex items-start gap-4 mb-4">
                      <Image
                        src={message.avatar}
                        alt={message.author}
                        width={48}
                        height={48}
                        className="rounded-full"
                        data-ai-hint="person portrait"
                      />
                      <div>
                        <DialogTitle className="mb-1">{message.title}</DialogTitle>
                        <DialogDescription className="flex items-center gap-4">
                          <span>{message.author}</span>
                          <Badge variant={message.priority === "high" ? "destructive" : "secondary"}>
                            {message.priority === "high" ? "重要" : "更新"}
                          </Badge>
                          <span>{message.time}</span>
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto whitespace-pre-wrap">
                    {message.fullContent}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}
