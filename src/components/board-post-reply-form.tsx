
'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/lib/firebase'; // Client SDK
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

type BoardPostReplyFormProps = {
  postId: string;
  onReplySuccess?: () => void;
};

function SubmitButton({ disabled, pending }: { disabled: boolean; pending: boolean }) {
  return (
    <Button type="submit" size="icon" disabled={pending || disabled} className="shrink-0 h-9 w-9">
      <Send className="h-4 w-4" />
      <span className="sr-only">返信する</span>
    </Button>
  );
}

export function BoardPostReplyForm({ postId, onReplySuccess }: BoardPostReplyFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const postRef = doc(db, "posts", postId);
      
      // This user is an executive, get their details.
      // TODO: Replace with actual logged-in executive user data
      const executiveUser = {
        author: '田中 CEO',
        avatar: 'https://picsum.photos/seed/ceo/100/100',
      };

      const newReply = {
        ...executiveUser,
        content,
        createdAt: new Date(), // Using client-side date for replies for simplicity
      };

      // Firestore doesn't have serverTimestamp for arrayUnion, so we use client time.
      // For more accuracy, this could be a separate subcollection.
      await updateDoc(postRef, {
        replies: arrayUnion(newReply)
      });
      
      setContent('');
      formRef.current?.reset();
      onReplySuccess?.();

    } catch (error) {
      console.error("Error creating reply:", error);
      toast({
        title: "エラー",
        description: "返信中にエラーが発生しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start gap-3 w-full">
      <Image 
        src="https://picsum.photos/seed/ceo/100/100" 
        alt="経営陣のプロフィール写真"
        width={32}
        height={32}
        className="rounded-full mt-1"
        data-ai-hint="person portrait"
      />
      <form ref={formRef} onSubmit={handleCreateReply} className="flex-1 flex items-center gap-2">
        <Textarea 
          name="content" 
          placeholder="返信を追加..." 
          aria-label="返信の内容"
          rows={1}
          className="resize-none min-h-0 h-9 py-1.5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SubmitButton disabled={!content.trim()} pending={isSubmitting} />
      </form>
    </div>
  );
}

    