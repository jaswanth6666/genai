'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting personalized career paths based on a student's profile and assessment results.
 *
 * - aiCareerSuggestion - A function that triggers the career suggestion flow.
 * - AICareerSuggestionInput - The input type for the aiCareerSuggestion function.
 * - AICareerSuggestionOutput - The return type for the aiCareerSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { AICareerSuggestionInputSchema, AICareerSuggestionOutputSchema } from './schemas';

export type AICareerSuggestionInput = z.infer<typeof AICareerSuggestionInputSchema>;
export type AICareerSuggestionOutput = z.infer<typeof AICareerSuggestionOutputSchema>;

export async function aiCareerSuggestion(input: AICareerSuggestionInput): Promise<AICareerSuggestionOutput> {
  return aiCareerSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCareerSuggestionPrompt',
  input: {schema: AICareerSuggestionInputSchema},
  output: {schema: AICareerSuggestionOutputSchema},
  prompt: `You are an expert career counselor for Indian students. Your task is to provide highly personalized career recommendations based on a comprehensive user profile. Analyze all aspects of the profile to generate relevant suggestions, a match score for each, and a detailed rationale.

You must analyze the following user profile:

**1. Personal Information:**
*   Age: {{{personal.age}}}
*   Gender: {{{personal.gender}}}
*   Location: {{{personal.location}}} ({{{personal.locationType}}})
*   Languages: {{{personal.languages}}}

**2. Education Background:**
*   Level: {{{education.education}}}
*   Stream: {{{education.stream}}}
*   Board/University: {{{education.board}}}
*   Grades: {{{education.grades}}}
*   Learning Style: {{{education.learningStyle}}}

**3. Skills & Interests:**
*   Technical Skills: {{#each skills.techSkills}}{{{this}}}, {{/each}}
*   Soft Skills: {{#each skills.softSkills}}{{{this}}}, {{/each}}
*   Hobbies & Interests: {{{skills.hobbies}}}

**4. Aptitude, Personality & Goals:**
*   Aptitude Scores: Logical: {{{goals.logicalScore}}}%, Verbal: {{{goals.verbalScore}}}%, Creativity: {{{goals.creativityScore}}}%
*   Personality Type: {{{goals.personality}}}
*   Short-Term Goals: {{{goals.shortTermGoals}}}
*   Long-Term Goals: {{{goals.longTermGoals}}}
*   Preferred Work Style: {{{goals.workStyle}}}
*   Interested Industries: {{#each goals.industries}}{{{this}}}, {{/each}}

**Your Task:**

1.  **Analyze the Profile:** Carefully consider all the information provided. Weigh the importance of skills, interests, academic background, and personal goals.
2.  **Suggest 3-5 Career Paths:** Based on your analysis, suggest 3 to 5 highly relevant career paths for the student.
3.  **Calculate a Match Score:** For each suggestion, provide a matchScore between 0 and 100. This score should represent how strongly the career aligns with the user's overall profile. A higher score indicates a better fit. The scoring should be based on a holistic view of all inputs.
4.  **Provide a Detailed Rationale:** Write a comprehensive rationale explaining *why* these careers are recommended. Connect your reasoning directly to the user's profile details. For example, explain how their skills, interests (hobbies), and personality type make them a good fit for each suggestion.

**Output Format:** Your final output must strictly follow the defined output schema.
`,
});

const aiCareerSuggestionFlow = ai.defineFlow(
  {
    name: 'aiCareerSuggestionFlow',
    inputSchema: AICareerSuggestionInputSchema,
    outputSchema: AICareerSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
