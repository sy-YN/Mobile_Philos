
'use server';

import type { AnalyzeBoardPostSentimentOutput } from '@/ai/flows/analyze-board-post-sentiment';
import type { Timestamp } from 'firebase/firestore';

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
