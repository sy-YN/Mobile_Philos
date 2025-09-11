// src/ai/flows/analyze-board-post-sentiment.ts
'use server';
/**
 * @fileOverview Analyzes the sentiment of discussion board posts to identify posts that may require moderation.
 *
 * - analyzeBoardPostSentiment - A function that handles the sentiment analysis process.
 * - AnalyzeBoardPostSentimentInput - The input type for the analyzeBoardPostSentiment function.
 * - AnalyzeBoardPostSentimentOutput - The return type for the analyzeBoardPostSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBoardPostSentimentInputSchema = z.object({
  text: z.string().describe('The text content of the discussion board post.'),
});
export type AnalyzeBoardPostSentimentInput = z.infer<typeof AnalyzeBoardPostSentimentInputSchema>;

const AnalyzeBoardPostSentimentOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the text, can be positive, negative, or neutral. If the sentiment is negative, it should also include the reason for the negative sentiment.'
    ),
  requiresModeration: z
    .boolean()
    .describe('Whether the post requires moderation based on the sentiment.'),
});
export type AnalyzeBoardPostSentimentOutput = z.infer<typeof AnalyzeBoardPostSentimentOutputSchema>;

export async function analyzeBoardPostSentiment(input: AnalyzeBoardPostSentimentInput): Promise<AnalyzeBoardPostSentimentOutput> {
  return analyzeBoardPostSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBoardPostSentimentPrompt',
  input: {schema: AnalyzeBoardPostSentimentInputSchema},
  output: {schema: AnalyzeBoardPostSentimentOutputSchema},
  prompt: `You are a moderator for a discussion board and you are responsible for analyzing the sentiment of the posts.

Analyze the following text and determine the sentiment.
Text: {{{text}}}

Respond using JSON format.

If the sentiment is negative, also specify why and set requiresModeration to true.
If the sentiment is neutral or positive, set requiresModeration to false.`,
});

const analyzeBoardPostSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeBoardPostSentimentFlow',
    inputSchema: AnalyzeBoardPostSentimentInputSchema,
    outputSchema: AnalyzeBoardPostSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
