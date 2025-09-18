
'use client';

import { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createPost, type FormState, type Post } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import Image from 'next/image';

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending || disabled} className="shrink-0">
      <Send className="h-4 w-4" />
      <span className="sr-only">投稿する</span>
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

type BoardPostFormProps = {
  onPostCreated: (post: Post) => void;
};

export function BoardPostForm({ onPostCreated }: BoardPostFormProps) {
  const [state, formAction] = useActionState(createPost, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (state.message) {
      if (state.post) {
        toast({
          title: "成功",
          description: state.message,
        });
        onPostCreated(state.post);
        formRef.current?.reset();
        setContent('');
      } else if (state.errors) {
        toast({
          title: "エラー",
          description: state.errors.content?.[0] || '入力内容を確認してください。',
          variant: "destructive",
        });
      } else {
         toast({
          title: "エラー",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, onPostCreated, toast]);

  return (
    <div className="flex items-start gap-3 w-full">
      <Image 
        src="https://picsum.photos/seed/you/100/100" 
        alt="あなたのプロフィール写真"
        width={32}
        height={32}
        className="rounded-full mt-1.5"
        data-ai-hint="person portrait"
      />
      <form ref={formRef} action={formAction} className="flex-1 flex items-center gap-2">
        <Textarea 
          name="content" 
          placeholder="コメントを追加..." 
          aria-label="投稿の内容"
          rows={1}
          className="resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SubmitButton disabled={!content.trim()} />
      </form>
    </div>
  );
}
