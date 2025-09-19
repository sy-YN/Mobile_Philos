
'use server';

import { analyzeBoardPostSentiment, type AnalyzeBoardPostSentimentOutput } from '@/ai/flows/analyze-board-post-sentiment';
import { z } from 'zod';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

const formSchema = z.object({
  content: z.string().min(1, '内容は1文字以上で入力してください。'),
});

export type Post = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  time: string | Date;
  analysis?: AnalyzeBoardPostSentimentOutput;
  createdAt: Timestamp;
};

export type FormState = {
  message: string;
  success: boolean;
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
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { content } = validatedFields.data;

  try {
    const analysis = await analyzeBoardPostSentiment({ text: content });

    const newPost = {
      author: '鈴木 雄大', // In a real app, this would come from user session
      avatar: 'https://picsum.photos/seed/yudai/100/100',
      content,
      likes: 0,
      analysis,
      createdAt: Timestamp.now(),
    };

    await db.collection('posts').add(newPost);

    return { message: '投稿が正常に作成されました。', success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    return { message: '投稿中にエラーが発生しました。', success: false };
  }
}
