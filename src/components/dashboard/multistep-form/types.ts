import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  age: z.string().min(1, 'Please enter your age.'),
  gender: z.string().min(1, 'Please select a gender.'),
  location: z.string().min(1, 'Please enter your location.'),
  locationType: z.string().min(1, 'Please select a location type.'),
  languages: z.string().min(3, 'Please list the languages you speak.'),
});

export const EducationSchema = z.object({
  education: z.string().min(1, 'Please select your education level.'),
  stream: z.string().optional(),
  board: z.string().optional(),
  grades: z.string().min(1, 'Please enter your grades/CGPA.'),
  learningStyle: z.string().min(1, 'Please select your learning style.'),
});

export const SkillsSchema = z.object({
  techSkills: z.array(z.string()).min(1, 'Please list at least one technical skill.'),
  softSkills: z.array(z.string()).min(1, 'Please list at least one soft skill.'),
  hobbies: z.string().min(10, 'Tell us more about your hobbies.'),
});

export const GoalsSchema = z.object({
  personality: z.string().min(1, 'Please select a personality type.'),
  logicalScore: z.number().min(0).max(100),
  verbalScore: z.number().min(0).max(100),
  creativityScore: z.number().min(0).max(100),
  shortTermGoals: z.string().min(10, 'Describe your short-term goals.'),
  longTermGoals: z.string().min(10, 'Describe your long-term goals.'),
  workStyle: z.string().min(1, 'Please select a preferred work style.'),
  industries: z.array(z.string()).min(1, 'Select at least one industry.'),
});

export const formSchema = PersonalInfoSchema.merge(EducationSchema)
  .merge(SkillsSchema)
  .merge(GoalsSchema);

export type ProfileFormData = z.infer<typeof formSchema>;
