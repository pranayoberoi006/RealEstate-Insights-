// src/ai/flows/personalized-guidance.ts
'use server';

/**
 * @fileOverview A flow that provides personalized guidance to new users based on their real estate goals.
 *
 * - getPersonalizedGuidance - A function that generates personalized guidance text.
 * - PersonalizedGuidanceInput - The input type for the getPersonalizedGuidance function.
 * - PersonalizedGuidanceOutput - The return type for the getPersonalizedGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedGuidanceInputSchema = z.object({
  realEstateGoal: z
    .string()
    .describe(
      'The users real estate goal.  Examples: Find a house, sell a house, find a commercial property, etc.'
    ),
});
export type PersonalizedGuidanceInput = z.infer<
  typeof PersonalizedGuidanceInputSchema
>;

const PersonalizedGuidanceOutputSchema = z.object({
  guidanceText: z
    .string()
    .describe(
      'Personalized guidance text explaining how the website can help the user achieve their real estate goal.'
    ),
});
export type PersonalizedGuidanceOutput = z.infer<
  typeof PersonalizedGuidanceOutputSchema
>;

export async function getPersonalizedGuidance(
  input: PersonalizedGuidanceInput
): Promise<PersonalizedGuidanceOutput> {
  return personalizedGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedGuidancePrompt',
  input: {schema: PersonalizedGuidanceInputSchema},
  output: {schema: PersonalizedGuidanceOutputSchema},
  prompt: `You are an expert real estate advisor. A user has provided their real estate goal.  Explain how the website can help them achieve their goal.

Real Estate Goal: {{{realEstateGoal}}}

Guidance:`,
});

const personalizedGuidanceFlow = ai.defineFlow(
  {
    name: 'personalizedGuidanceFlow',
    inputSchema: PersonalizedGuidanceInputSchema,
    outputSchema: PersonalizedGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
