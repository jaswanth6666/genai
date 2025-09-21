'use server';

import {
  aiCareerSuggestion,
  AICareerSuggestionInput,
  AICareerSuggestionOutput,
} from '@/ai/flows/ai-career-suggestion';
import {
  analyzeSkillsGap,
  SkillsGapAnalysisInput,
  SkillsGapAnalysisOutput,
} from '@/ai/flows/skills-gap-analysis';
import {
  personalizedRoadmapGeneration,
  PersonalizedRoadmapGenerationInput,
  PersonalizedRoadmapGenerationOutput,
} from '@/ai/flows/personalized-roadmap-generation';
import {
  multilingualChatbot,
  MultilingualChatbotInput,
  MultilingualChatbotOutput,
} from '@/ai/flows/multilingual-chatbot';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

export async function getCareerSuggestions(
  input: AICareerSuggestionInput
): Promise<AICareerSuggestionOutput> {
  return await aiCareerSuggestion(input);
}

const getSkillsPrompt = ai.definePrompt(
    {
        name: 'getSkillsPrompt',
        input: { schema: z.object({ careerName: z.string() }) },
        output: { schema: z.object({ skills: z.array(z.string()) }) },
        prompt: `
            List the top 10 most important technical and soft skills required for a career in {{{careerName}}}.
            Return only the list of skills.
        `,
    }
);

export async function getSkillsForCareer(careerName: string): Promise<string[]> {
  const { output } = await getSkillsPrompt({ careerName });
  return output?.skills || [];
}

export async function getSkillsGap(
  input: SkillsGapAnalysisInput
): Promise<SkillsGapAnalysisOutput> {
  return await analyzeSkillsGap(input);
}

export async function getPersonalizedRoadmap(
  input: PersonalizedRoadmapGenerationInput
): Promise<PersonalizedRoadmapGenerationOutput> {
  return await personalizedRoadmapGeneration(input);
}

export async function getChatbotResponse(
  input: MultilingualChatbotInput
): Promise<MultilingualChatbotOutput> {
  return await multilingualChatbot(input);
}
