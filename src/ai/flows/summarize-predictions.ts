'use server';

/**
 * @fileOverview A flow that summarizes a user's price prediction history.
 *
 * - summarizePredictions - A function that generates a summary of past predictions.
 * - SummarizePredictionsInput - The input type for the summarizePredictions function.
 * - SummarizePredictionsOutput - The return type for the summarizePredictions function.
 */

import { ai } from '@/ai/genkit';
import {
  SummarizePredictionsInputSchema,
  SummarizePredictionsOutputSchema,
  type SummarizePredictionsInput,
  type SummarizePredictionsOutput,
} from '@/lib/types';

export async function summarizePredictions(
  input: SummarizePredictionsInput
): Promise<SummarizePredictionsOutput> {
  return summarizePredictionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePredictionsPrompt',
  input: { schema: SummarizePredictionsInputSchema },
  output: { schema: SummarizePredictionsOutputSchema },
  prompt: `You are a real estate analyst. Analyze the following list of past property price predictions and provide a brief, insightful summary for the user. Highlight any trends you notice, such as focusing on a particular location, property type, or budget.

Prediction History:
{{#each history}}
- Looked up a {{input.bedrooms}} {{input.category}} in a {{input.locationType}} part of {{input.location}} ({{input.area}} sq ft) on {{timestamp}}. Predicted Price: ₹{{output.predictedPrice}}.
{{/each}}

Summary:`,
});

const summarizePredictionsFlow = ai.defineFlow(
  {
    name: 'summarizePredictionsFlow',
    inputSchema: SummarizePredictionsInputSchema,
    outputSchema: SummarizePredictionsOutputSchema,
  },
  async (input) => {
    if (input.history.length === 0) {
      return { summary: 'No prediction history found.' };
    }
    const { output } = await prompt(input);
    return output!;
  }
);
