import {z} from 'genkit';

export const AICareerSuggestionInputSchema = z.object({
  personal: z.object({
    age: z.string(),
    gender: z.string(),
    location: z.string(),
    locationType: z.string(),
    languages: z.string(),
  }),
  education: z.object({
    education: z.string(),
    stream: z.string().optional(),
    board: z.string().optional(),
    grades: z.string(),
    learningStyle: z.string(),
  }),
  skills: z.object({
    techSkills: z.array(z.string()),
    softSkills: z.array(z.string()),
    hobbies: z.string(),
  }),
  goals: z.object({
    personality: z.string(),
    logicalScore: z.number(),
    verbalScore: z.number(),
    creativityScore: z.number(),
    shortTermGoals: z.string(),
    longTermGoals: z.string(),
    workStyle: z.string(),
    industries: z.array(z.string()),
  }),
});

export const AICareerSuggestionOutputSchema = z.object({
  suggestedCareers: z.array(z.object({
    career: z.string().describe('The name of the suggested career path.'),
    matchScore: z.number().describe('A score from 0 to 100 indicating how well this career matches the user\'s profile.'),
  })).describe('A list of 3-5 suggested career paths, tailored to the student profile and assessment results.'),
  rationale: z
    .string()
    .describe('A detailed explanation of why each career path is suggested, based on the student profile and assessment results.'),
});
