
'use client';

import { useState, useMemo } from 'react';
import { BoardPostForm } from '@/components/board-post-form';
import { BoardPostCard } from '@/components/board-post-card';
import { type Post } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const initialPosts: Post[] = [
    {
    id: 1,
    author: '山田さん',
    avatar: 'https://picsum.photos/seed/p1/100/100',
    title: '企業理念について思うこと',
    content: '「エンパワーメント」の価値観、素晴らしいと思います。私たち一人ひとりが裁量を持って仕事に取り組める環境は、モチベーション向上に繋がりますね。',
    likes: 12,
    comments: 3,
    time: '1時間前'
  },
  {
    id: 2,
    author: '鈴木さん',
    avatar: 'https://picsum.photos/seed/p2/100/100',
    title: '透明性について',
    content: '情報の透明性が高いと、会社への信頼感が増します。今後もオープンな情報共有を期待しています。',
    likes: 8,
    comments: 1,
    time: '3時間前'
  },
  {
    id: 3,
    author: '佐藤さん',
    avatar: 'https://picsum.photos/seed/p3/100/100',
    title: '協業の重要性',
    content: '部署間の連携がもっとスムーズになれば、新しいイノベーションが生まれるはず。協業を促進する具体的な施策があると嬉しいです。',
    likes: 25,
    comments: 7,
    time: '1日前',
    analysis: {
      sentiment: '改善提案 - 協業促進の施策を求めている',
      requiresModeration: true,
    }
  },
];


export function BoardTab() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePostCreated = (post: Post) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-foreground font-headline mb-4">理念掲示板</h2>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">すべて</TabsTrigger>
          <TabsTrigger value="hot">人気</TabsTrigger>
          <TabsTrigger value="new">新着</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          <BoardPostForm onPostCreated={handlePostCreated} />
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="投稿を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="space-y-3">
            {filteredPosts.map(post => (
              <BoardPostCard key={post.id} post={post} />
            ))}
            {searchTerm && filteredPosts.length === 0 && (
              <div className="text-center text-muted-foreground pt-8">
                <p>「{searchTerm}」に一致する結果は見つかりませんでした。</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="hot">
          {/* TODO: Implement hot posts */}
           <div className="text-center text-muted-foreground pt-8">
            <p>人気の投稿は現在準備中です。</p>
          </div>
        </TabsContent>
        <TabsContent value="new">
          {/* TODO: Implement new posts */}
          <div className="text-center text-muted-foreground pt-8">
            <p>新着の投稿は現在準備中です。</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
