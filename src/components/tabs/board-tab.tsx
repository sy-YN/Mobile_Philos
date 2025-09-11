
'use client';

import { useState } from 'react';
import type { Post } from '@/app/actions';
import { BoardPostCard } from '@/components/board-post-card';
import { BoardPostForm } from '@/components/board-post-form';

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Yamada, Manager",
    avatar: 'https://picsum.photos/seed/manager/100/100',
    title: "New Project Launch",
    content: "The AI utilization project has officially started. Let's make it a success together!",
    likes: 24,
    comments: 8,
    time: "3h ago",
  },
  {
    id: 2,
    author: "Suzuki, Lead",
    avatar: 'https://picsum.photos/seed/lead/100/100',
    title: "Notice of Training Session",
    content: "We will be holding a skill-up training session next month. Please check your calendars.",
    likes: 15,
    comments: 3,
    time: "5h ago",
  },
];

export function BoardTab() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-foreground font-headline">Discussion Board</h2>
      <BoardPostForm onPostCreated={addPost} />
      <div className="space-y-4 pt-4">
        {posts.map((post) => (
          <BoardPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
