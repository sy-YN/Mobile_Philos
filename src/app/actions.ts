
'use server';

import { analyzeBoardPostSentiment, type AnalyzeBoardPostSentimentOutput } from '@/ai/flows/analyze-board-post-sentiment';
import { z } from 'zod';

const formSchema = z.object({
  content: z.string().min(1, '内容は1文字以上で入力してください。'),
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
    content?: string[];
  };
};

export async function createPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      message: '検証に失敗しました。',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { content } = validatedFields.data;

  try {
    const analysis = await analyzeBoardPostSentiment({ text: content });

    const newPost: Post = {
      id: Date.now(),
      author: 'あなた',
      avatar: 'https://picsum.photos/seed/you/100/100',
      title: '', // Title is no longer provided from the form
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
