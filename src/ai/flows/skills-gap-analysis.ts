'use server';

/**
 * @fileOverview An AI agent for identifying skill gaps between a student's current skills and the skills required for their suggested career paths.
 *
 * - analyzeSkillsGap - A function that analyzes the skill gap between a student's current skills and the skills needed for a career path.
 * - SkillsGapAnalysisInput - The input type for the analyzeSkillsGap function.
 * - SkillsGapAnalysisOutput - The return type for the analyzeSkillsGap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillsGapAnalysisInputSchema = z.object({
  studentSkills: z
    .array(z.string())
    .describe('A list of skills the student currently possesses.'),
  careerPathSkills: z
    .array(z.string())
    .describe('A list of skills required for the suggested career path.'),
  careerPathName: z.string().describe('The name of the career path.'),
});
export type SkillsGapAnalysisInput = z.infer<typeof SkillsGapAnalysisInputSchema>;

const SkillsGapAnalysisOutputSchema = z.object({
  missingSkills: z
    .array(z.string())
    .describe('A list of skills the student is missing for the career path.'),
  overlapSkills: z
    .array(z.string())
    .describe('A list of skills that overlaps between the student and career path.'),
  analysisSummary: z
    .string()
    .describe('A summary of the skills gap analysis, including the importance of the missing skills.'),
});
export type SkillsGapAnalysisOutput = z.infer<typeof SkillsGapAnalysisOutputSchema>;

export async function analyzeSkillsGap(
  input: SkillsGapAnalysisInput
): Promise<SkillsGapAnalysisOutput> {
  return analyzeSkillsGapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillsGapAnalysisPrompt',
  input: {schema: SkillsGapAnalysisInputSchema},
  output: {schema: SkillsGapAnalysisOutputSchema},
  prompt: `You are a career advisor helping students identify skills gaps for their desired career paths.

  A student with the following skills: {{{studentSkills}}}

is interested in the career path: {{{careerPathName}}} which requires the following skills: {{{careerPathSkills}}}.

  Identify the skills that the student is missing and the skills that overlap. Also, create a summary of the skills gap analysis, including the importance of the missing skills and how they can be acquired.

  Return the missing skills, overlap skills, and analysis summary in the correct output schema.
  `,
});

const analyzeSkillsGapFlow = ai.defineFlow(
  {
    name: 'analyzeSkillsGapFlow',
    inputSchema: SkillsGapAnalysisInputSchema,
    outputSchema: SkillsGapAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
