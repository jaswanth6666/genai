'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating a personalized learning roadmap for a student.
 *
 * It takes student profile data, career suggestions, and skill gap analysis as input and generates a roadmap tailored to address skill gaps and guide students toward their chosen career path.
 *
 * @exports {personalizedRoadmapGeneration} - The main function to trigger the roadmap generation flow.
 * @exports {PersonalizedRoadmapGenerationInput} - The input type for the personalizedRoadmapGeneration function.
 * @exports {PersonalizedRoadmapGenerationOutput} - The output type for the personalizedRoadmapGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema definition
const PersonalizedRoadmapGenerationInputSchema = z.object({
  studentProfile: z.object({
    demographics: z.object({
      age: z.number().describe('Age of the student'),
      location: z.string().describe('Location of the student'),
      educationLevel: z.string().describe('Highest education level attained'),
    }).describe('Demographic information of the student'),
    interests: z.array(z.string()).describe('List of interests of the student'),
    assessmentResults: z.record(z.string(), z.any()).describe('Results from psychometric assessments'),
    skills: z.array(z.string()).describe('List of current skills of the student'),
  }).describe('Detailed profile of the student'),
  careerSuggestions: z.array(z.string()).describe('List of suggested career paths for the student'),
  skillGaps: z.record(z.string(), z.array(z.string())).describe('Analysis of skill gaps for each career suggestion'),
});

export type PersonalizedRoadmapGenerationInput = z.infer<typeof PersonalizedRoadmapGenerationInputSchema>;

// Output schema definition
const PersonalizedRoadmapGenerationOutputSchema = z.object({
  roadmap: z.array(z.object({
    step: z.string().describe('A step in the roadmap'),
    description: z.string().describe('Description of the step'),
    resources: z.array(z.string()).describe('List of resources for the step'),
    estimatedTime: z.string().describe('Estimated time to complete the step'),
  })).describe('A personalized learning roadmap'),
});

export type PersonalizedRoadmapGenerationOutput = z.infer<typeof PersonalizedRoadmapGenerationOutputSchema>;


// Main function to trigger the roadmap generation flow
export async function personalizedRoadmapGeneration(input: PersonalizedRoadmapGenerationInput): Promise<PersonalizedRoadmapGenerationOutput> {
  return personalizedRoadmapGenerationFlow(input);
}


const prompt = ai.definePrompt({
  name: 'personalizedRoadmapPrompt',
  input: { schema: PersonalizedRoadmapGenerationInputSchema },
  output: { schema: PersonalizedRoadmapGenerationOutputSchema },
  prompt: `You are an AI career coach specializing in generating personalized learning roadmaps for Indian students.

  Given the student's profile, suggested career paths, and skill gaps, generate a roadmap with actionable steps, descriptions, resources, and estimated time for each step.

  Student Profile:
  Demographics: {{{studentProfile.demographics}}}
  Interests: {{#each studentProfile.interests}}{{{this}}}, {{/each}}
  Assessment Results: {{{studentProfile.assessmentResults}}}
  Skills: {{#each studentProfile.skills}}{{{this}}}, {{/each}}

  Career Suggestions: {{#each careerSuggestions}}{{{this}}}, {{/each}}

  Skill Gaps: {{#each skillGaps}}{{{@key}}}: {{#each this}}{{{this}}}, {{/each}}{{/each}}

  Roadmap:
  `,
});


// Genkit flow definition
const personalizedRoadmapGenerationFlow = ai.defineFlow(
  {
    name: 'personalizedRoadmapGenerationFlow',
    inputSchema: PersonalizedRoadmapGenerationInputSchema,
    outputSchema: PersonalizedRoadmapGenerationOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
