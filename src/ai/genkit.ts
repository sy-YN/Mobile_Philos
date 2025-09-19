import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { experimental_taintObjectReference as taintObjectReference } from 'react';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

taintObjectReference(
  'The `ai` object is a server-only export.',
  ai,
);
