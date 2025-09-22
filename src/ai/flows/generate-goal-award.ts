'use server';
/**
 * @fileOverview Generates an award message based on a goal and its progress.
 *
 * - generateGoalAward - A function that handles the award generation process.
 * - GenerateGoalAwardInput - The input type for the generateGoalAward function.
 * - GenerateGoalAwardOutput - The return type for the generateGoalAward function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGoalAwardInputSchema = z.object({
  goal: z.string().describe('The goal that is being worked on.'),
  progress: z.number().describe('The progress of the goal, from 0 to 100.'),
});
export type GenerateGoalAwardInput = z.infer<typeof GenerateGoalAwardInputSchema>;

const GenerateGoalAwardOutputSchema = z.object({
  awardMessage: z
    .string()
    .describe('A short, celebratory message for the provided goal and progress. Max 25 characters.'),
});
export type GenerateGoalAwardOutput = z.infer<typeof GenerateGoalAwardOutputSchema>;

export async function generateGoalAward(
  input: GenerateGoalAwardInput
): Promise<GenerateGoalAwardOutput> {
  return generateGoalAwardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGoalAwardPrompt',
  input: {schema: GenerateGoalAwardInputSchema},
  output: {schema: GenerateGoalAwardOutputSchema},
  prompt: `You are a corporate cheerleader bot. Your job is to provide short, positive, and encouraging messages to teams based on their goals and progress.

The user will provide you with a goal and a progress percentage. Generate a suitable, short celebratory message.

- If progress is 100, say something about achieving the goal.
- If progress is > 70, say something about being close to the goal.
- If progress is > 30, say something encouraging about the good progress.
- If progress is <=30, say something to motivate them to keep going.
- The goal is: '{{{goal}}}'
- The progress is: {{{progress}}}%

Keep the message concise and impactful, under 25 characters.
Respond in JSON format.
`,
});

const generateGoalAwardFlow = ai.defineFlow(
  {
    name: 'generateGoalAwardFlow',
    inputSchema: GenerateGoalAwardInputSchema,
    outputSchema: GenerateGoalAwardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
