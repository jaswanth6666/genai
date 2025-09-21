'use server';

/**
 * @fileOverview A multilingual chatbot for student support and guidance.
 *
 * - multilingualChatbot - A function that handles chatbot interactions in multiple languages.
 * - MultilingualChatbotInput - The input type for the multilingualChatbot function.
 * - MultilingualChatbotOutput - The return type for the multilingualChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MultilingualChatbotInputSchema = z.object({
  language: z
    .string()
    .describe('The language in which the student wants to interact (e.g., English, Hindi).'),
  query: z.string().describe('The student’s question or request.'),
});
export type MultilingualChatbotInput = z.infer<typeof MultilingualChatbotInputSchema>;

const MultilingualChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot’s response in the specified language.'),
});
export type MultilingualChatbotOutput = z.infer<typeof MultilingualChatbotOutputSchema>;

export async function multilingualChatbot(input: MultilingualChatbotInput): Promise<MultilingualChatbotOutput> {
  return multilingualChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'multilingualChatbotPrompt',
  input: {schema: MultilingualChatbotInputSchema},
  output: {schema: MultilingualChatbotOutputSchema},
  prompt: `You are a helpful multilingual chatbot assisting Indian students with career guidance and support.

The student will ask a question in {{{language}}}, and you should respond in the same language.

Student Query: {{{query}}}

Response: `,
});

const multilingualChatbotFlow = ai.defineFlow(
  {
    name: 'multilingualChatbotFlow',
    inputSchema: MultilingualChatbotInputSchema,
    outputSchema: MultilingualChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
