
'use server';

import type { AnalyzeBoardPostSentimentOutput } from '@/ai/flows/analyze-board-post-sentiment';
import type { Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase-admin';
import { analyzeBoardPostSentiment } from '@/ai/flows/analyze-board-post-sentiment';

export type Reply = {
  id: string; // Add id to uniquely identify replies
  author: string;
  avatar: string;
  content: string;
  createdAt: Date | string | Timestamp;
};

export type Post = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  time: string | Date;
  analysis?: AnalyzeBoardPostSentimentOutput;
  createdAt: Timestamp | Date | string; // Updated type definition
  replies?: Reply[];
};

export type FormState = {
  message: string;
  success: boolean;
  errors?: {
    content?: string[];
  };
};


export async function createPostWithAnalysis(postId: string, content: string) {
  try {
    const analysis = await analyzeBoardPostSentiment({ text: content });

    const postRef = db.collection('posts').doc(postId);
    await postRef.update({ analysis });

    return { success: true, analysis };
  } catch (error) {
    console.error('Error in createPostWithAnalysis:', error);
    return { success: false, error: 'AI analysis failed.' };
  }
}
