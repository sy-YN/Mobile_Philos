'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import Image from 'next/image';
// import { useFirestore } from '@/firebase';
// import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { errorEmitter } from '@/firebase/error-emitter';
// import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

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
  // const { db } = useFirestore();
  const db = null;

  const handleCreateReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!db) return;
    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);
    console.log("Creating reply...");
    setIsSubmitting(false);
    setContent('');
    formRef.current?.reset();
    onReplySuccess?.();
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
