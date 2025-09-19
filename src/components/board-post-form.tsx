
'use client';

import { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createPost, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import Image from 'next/image';

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending || disabled} className="shrink-0 h-10 w-10">
      <Send className="h-4 w-4" />
      <span className="sr-only">投稿する</span>
    </Button>
  );
}

const initialState: FormState = {
  message: '',
  success: false,
};

export function BoardPostForm() {
  const [state, formAction] = useActionState(createPost, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "成功",
          description: state.message,
        });
        formRef.current?.reset();
        setContent('');
      } else {
        toast({
          title: "エラー",
          description: state.errors?.content?.[0] || state.message || '入力内容を確認してください。',
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

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
      <form ref={formRef} action={formAction} className="flex-1 flex items-center gap-2">
        <Textarea 
          name="content" 
          placeholder="コメントを追加..." 
          aria-label="投稿の内容"
          rows={1}
          className="resize-none min-h-0 h-10 py-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SubmitButton disabled={!content.trim()} />
      </form>
    </div>
  );
}
