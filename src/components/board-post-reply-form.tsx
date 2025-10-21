'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/lib/firebase.tsx'; // Client SDK
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

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

    const postRef = doc(db, "posts", postId);
      
    const executiveUser = {
      author: '田中 CEO',
      avatar: 'https://picsum.photos/seed/ceo/100/100',
    };

    const newReply = {
      id: `reply-${Date.now()}`, // Simple unique ID for the reply
      ...executiveUser,
      content,
      createdAt: new Date(), 
    };

    const updateData = {
      replies: arrayUnion(newReply)
    };

    updateDoc(postRef, updateData).then(() => {
      setContent('');
      formRef.current?.reset();
      toast({
        title: "成功",
        description: "返信が投稿されました。",
      });
      onReplySuccess?.();
    }).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: postRef.path,
        operation: 'update',
        requestResourceData: updateData,
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
      setIsSubmitting(false);
    });
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
