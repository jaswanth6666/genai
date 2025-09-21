'use client';
import React, { createContext, useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, ProfileFormData } from './types';

const defaultValues: ProfileFormData = {
  // Personal
  name: '',
  age: '',
  gender: '',
  location: '',
  locationType: '',
  languages: '',
  // Education
  education: '',
  stream: '',
  board: '',
  grades: '',
  learningStyle: '',
  // Skills
  techSkills: [],
  softSkills: [],
  hobbies: '',
  // Goals
  personality: '',
  logicalScore: 50,
  verbalScore: 50,
  creativityScore: 50,
  shortTermGoals: '',
  longTermGoals: '',
  workStyle: '',
  industries: [],
};


type ProfileFormContextType = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
};

const ProfileFormContext = createContext<ProfileFormContextType | undefined>(undefined);

export const ProfileFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <ProfileFormContext.Provider value={{ currentStep, setCurrentStep, totalSteps }}>
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </ProfileFormContext.Provider>
  );
};

export const useProfileForm = () => {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error('useProfileForm must be used within a ProfileFormProvider');
  }
  return context;
};
