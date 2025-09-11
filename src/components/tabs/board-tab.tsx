
'use client';

import { useState } from 'react';
import type { Post } from '@/app/actions';
import { BoardPostCard } from '@/components/board-post-card';

const philosophyPosts: Post[] = [
  {
    id: 1,
    author: "EmpowerU",
    avatar: 'https://picsum.photos/seed/philosophy/100/100',
    title: "Our Mission",
    content: "To empower every individual in the organization to reach their full potential and drive collective success.",
    likes: 152,
    comments: 12,
    time: "Since 2024",
  },
  {
    id: 2,
    author: "EmpowerU",
    avatar: 'https://picsum.photos/seed/philosophy/100/100',
    title: "Our Vision",
    content: "To create a culture of continuous improvement, innovation, and collaboration, where every voice is heard and valued.",
    likes: 148,
    comments: 9,
    time: "Since 2024",
  },
  {
    id: 3,
    author: "EmpowerU",
    avatar: 'https://picsum.photos/seed/philosophy/100/100',
    title: "Our Values",
    content: "1. Empowerment\n2. Transparency\n3. Collaboration\n4. Growth\n5. Inclusivity",
    likes: 210,
    comments: 25,
    time: "Since 2024",
  },
];

export function BoardTab() {
  const [posts, setPosts] = useState<Post[]>(philosophyPosts);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-foreground font-headline">Company Philosophy</h2>
      <div className="space-y-4 pt-4">
        {posts.map((post) => (
          <BoardPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
