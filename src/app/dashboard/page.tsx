'use client';

import { useState, useTransition } from 'react';
import type {
  AICareerSuggestionInput,
  AICareerSuggestionOutput,
  SkillsGapAnalysisOutput,
  PersonalizedRoadmapGenerationOutput,
} from '@/ai/flows';
import {
  getCareerSuggestions,
  getSkillsGap,
  getPersonalizedRoadmap,
  getSkillsForCareer,
} from '@/app/actions';

import CareerSuggestions from '@/components/dashboard/CareerSuggestions';
import SkillsGap from '@/components/dashboard/SkillsGap';
import LearningRoadmap from '@/components/dashboard/LearningRoadmap';
import Loading from '@/components/common/Loading';
import { useToast } from '@/hooks/use-toast';
import { ProfileFormProvider, useProfileForm } from '@/components/dashboard/multistep-form/ProfileFormContext';
import ProfileForm from '@/components/dashboard/multistep-form/ProfileForm';
import { ProfileFormData } from '@/components/dashboard/multistep-form/types';

type Step = 'profile' | 'careers' | 'gap' | 'roadmap';

function DashboardContent() {
  const [step, setStep] = useState<Step>('profile');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [careerSuggestions, setCareerSuggestions] =
    useState<AICareerSuggestionOutput | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [skillsGap, setSkillsGap] = useState<SkillsGapAnalysisOutput | null>(
    null
  );
  const [roadmap, setRoadmap] =
    useState<PersonalizedRoadmapGenerationOutput | null>(null);

  const handleError = (error: unknown) => {
    console.error(error);
    toast({
      variant: 'destructive',
      title: 'An error occurred',
      description:
        'Something went wrong while generating the AI response. Please try again.',
    });
  };

  const handleProfileSubmit = (data: ProfileFormData) => {
    startTransition(async () => {
      try {
        setProfile(data);
        const suggestionInput: AICareerSuggestionInput = {
          personal: {
            age: data.age,
            gender: data.gender,
            location: data.location,
            locationType: data.locationType,
            languages: data.languages,
          },
          education: {
            education: data.education,
            stream: data.stream,
            board: data.board,
            grades: data.grades,
            learningStyle: data.learningStyle,
          },
          skills: {
            techSkills: data.techSkills,
            softSkills: data.softSkills,
            hobbies: data.hobbies,
          },
          goals: {
            personality: data.personality,
            logicalScore: data.logicalScore,
            verbalScore: data.verbalScore,
            creativityScore: data.creativityScore,
            shortTermGoals: data.shortTermGoals,
            longTermGoals: data.longTermGoals,
            workStyle: data.workStyle,
            industries: data.industries,
          }
        };

        const suggestions = await getCareerSuggestions(suggestionInput);

        setCareerSuggestions(suggestions);
        setStep('careers');
      } catch (error) {
        handleError(error);
        setStep('profile');
      }
    });
  };

  const handleCareerSelect = (career: string) => {
    startTransition(async () => {
      if (!profile) return;
      try {
        setSelectedCareer(career);
        const studentSkills = [...profile.techSkills, ...profile.softSkills];
        const careerPathSkills = await getSkillsForCareer(career);

        const gap = await getSkillsGap({
          studentSkills,
          careerPathSkills,
          careerPathName: career,
        });

        setSkillsGap(gap);
        setStep('gap');
      } catch (error) {
        handleError(error);
      }
    });
  };

  const handleRoadmapGeneration = () => {
    startTransition(async () => {
      if (!profile || !selectedCareer || !skillsGap) return;
      try {
        const roadmapInput = {
          studentProfile: {
            demographics: {
              age: parseInt(profile.age, 10),
              location: profile.locationType,
              educationLevel: profile.education,
            },
            interests: profile.hobbies.split(',').map((s) => s.trim()),
            assessmentResults: { summary: 'User-provided interests and skills' },
            skills: [...profile.techSkills, ...profile.softSkills],
          },
          careerSuggestions: [selectedCareer],
          skillGaps: {
            [selectedCareer]: skillsGap.missingSkills,
          },
        };
        const generatedRoadmap = await getPersonalizedRoadmap(roadmapInput);
        setRoadmap(generatedRoadmap);
        setStep('roadmap');
      } catch (error) {
        handleError(error);
      }
    });
  };

  const handleRestart = () => {
    setStep('profile');
    setProfile(null);
    setCareerSuggestions(null);
    setSelectedCareer(null);
    setSkillsGap(null);
    setRoadmap(null);
  };

  const renderStep = () => {
    if (isPending && step !== 'profile') {
      return <Loading />;
    }

    switch (step) {
      case 'profile':
        return <ProfileForm onSubmit={handleProfileSubmit} isPending={isPending} />;
      case 'careers':
        return (
          careerSuggestions && (
            <CareerSuggestions
              suggestions={careerSuggestions}
              onSelect={handleCareerSelect}
            />
          )
        );
      case 'gap':
        return (
          skillsGap && (
            <SkillsGap
              gapAnalysis={skillsGap}
              onContinue={handleRoadmapGeneration}
              careerName={selectedCareer || ''}
            />
          )
        );
      case 'roadmap':
        return (
          roadmap && (
            <LearningRoadmap
              roadmap={roadmap}
              onRestart={handleRestart}
              careerName={selectedCareer || ''}
            />
          )
        );
      default:
        return <ProfileForm onSubmit={handleProfileSubmit} isPending={isPending} />;
    }
  };

  return <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{renderStep()}</div>;
}


export default function DashboardPage() {
    return (
        <ProfileFormProvider>
            <DashboardContent />
        </ProfileFormProvider>
    )
}
