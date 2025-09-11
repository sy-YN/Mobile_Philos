
'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createPost, type FormState, type Post } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? '投稿中...' : '投稿する'}
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
  const [state, formAction] = useFormState(createPost, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.post) {
        toast({
          title: "成功",
          description: state.message,
        });
        onPostCreated(state.post);
        formRef.current?.reset();
      } else if (state.errors) {
        // Errors are displayed inline
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
    <Card>
      <CardHeader>
        <CardTitle className="text-base">新規投稿を作成</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <Input name="title" placeholder="投稿のタイトル" aria-label="投稿のタイトル" />
            {state.errors?.title && (
              <p className="text-xs text-destructive mt-1">{state.errors.title[0]}</p>
            )}
          </div>
          <div>
            <Textarea name="content" placeholder="何を考えていますか？" aria-label="投稿の内容" />
            {state.errors?.content && (
              <p className="text-xs text-destructive mt-1">{state.errors.content[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
