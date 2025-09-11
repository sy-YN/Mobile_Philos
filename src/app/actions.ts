
'use server';

import { analyzeBoardPostSentiment, type AnalyzeBoardPostSentimentOutput } from '@/ai/flows/analyze-board-post-sentiment';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(3, 'タイトルは3文字以上で入力してください。'),
  content: z.string().min(10, '内容は10文字以上で入力してください。'),
});

export type Post = {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  analysis?: AnalyzeBoardPostSentimentOutput;
};

export type FormState = {
  message: string;
  post?: Post;
  errors?: {
    title?: string[];
    content?: string[];
  };
};

export async function createPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      message: '検証に失敗しました。',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, content } = validatedFields.data;

  try {
    const analysis = await analyzeBoardPostSentiment({ text: content });

    const newPost: Post = {
      id: Date.now(),
      author: 'あなた',
      avatar: 'https://picsum.photos/seed/you/100/100',
      title,
      content,
      likes: 0,
      comments: 0,
      time: 'たった今',
      analysis,
    };

    return { message: '投稿が正常に作成されました。', post: newPost };
  } catch (error) {
    console.error(error);
    return { message: '感情分析中にエラーが発生しました。' };
  }
}
