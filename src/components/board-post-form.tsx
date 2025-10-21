'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import Image from 'next/image';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { createPostWithAnalysis } from '@/app/actions';
import { addDocumentNonBlocking } from '@/firebase';

function SubmitButton({ disabled, pending }: { disabled: boolean; pending: boolean }) {
  return (
    <Button type="submit" size="icon" disabled={pending || disabled} className="shrink-0 h-10 w-10">
      <Send className="h-4 w-4" />
      <span className="sr-only">投稿する</span>
    </Button>
  );
}

export function BoardPostForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();

  const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firestore) return;
    if (!content.trim()) {
      toast({
        title: "エラー",
        description: '内容は1文字以上で入力してください。',
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const newPost = {
        author: '鈴木 雄大', // Mock user
        avatar: 'https://picsum.photos/seed/yudai/100/100', // Mock avatar
        content: content.trim(),
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
        replies: [],
    };

    const postsCollection = collection(firestore, 'posts');
    const docRefPromise = addDocumentNonBlocking(postsCollection, newPost);
    
    docRefPromise.then(docRef => {
      if (docRef) {
        createPostWithAnalysis(docRef.id, newPost.content);
      }
    });

    setIsSubmitting(false);
    setContent('');
    formRef.current?.reset();
  };

  return (
    <div className="flex items-start gap-3 w-full">
      <Image 
        src="https://picsum.photos/seed/yudai/100/100" 
        alt="鈴木 雄大のプロフィール写真"
        width={40}
        height={40}
        className="rounded-full mt-1"
        data-ai-hint="person portrait"
      />
      <form ref={formRef} onSubmit={handleCreatePost} className="flex-1 flex items-center gap-2">
        <Textarea 
          name="content" 
          placeholder="コメントを追加..." 
          aria-label="投稿の内容"
          rows={1}
          className="resize-none min-h-0 h-10 py-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SubmitButton disabled={!content.trim()} pending={isSubmitting} />
      </form>
    </div>
  );
}
