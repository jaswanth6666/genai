'use client';
import { useFormContext } from 'react-hook-form';
import { useProfileForm } from './ProfileFormContext';
import { ProfileFormData } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import Step1_Personal from './Step1_Personal';
import Step2_Education from './Step2_Education';
import Step3_Skills from './Step3_Skills';
import Step4_Goals from './Step4_Goals';
import { Progress } from '@/components/ui/progress';

type ProfileFormProps = {
  onSubmit: (data: ProfileFormData) => void;
  isPending: boolean;
};

const steps = [
  {
    title: 'Personal Information',
    description: "Let's start with the basics.",
    component: <Step1_Personal />,
  },
  {
    title: 'Education Background',
    description: 'Tell us about your academic journey.',
    component: <Step2_Education />,
  },
  {
    title: 'Skills & Interests',
    description: 'What are you good at and what do you love doing?',
    component: <Step3_Skills />,
  },
  {
    title: 'Aptitude & Goals',
    description: 'Finally, let us know about your aspirations.',
    component: <Step4_Goals />,
  },
];

export default function ProfileForm({ onSubmit, isPending }: ProfileFormProps) {
  const { currentStep, setCurrentStep, totalSteps } = useProfileForm();
  const { handleSubmit, trigger } = useFormContext<ProfileFormData>();

  const handleNext = async () => {
    let fieldsToValidate: (keyof ProfileFormData)[] = [];
    switch (currentStep) {
      case 0:
        fieldsToValidate = ['name', 'age', 'gender', 'location', 'locationType', 'languages'];
        break;
      case 1:
        fieldsToValidate = ['education', 'stream', 'board', 'grades', 'learningStyle'];
        break;
      case 2:
        fieldsToValidate = ['techSkills', 'softSkills', 'hobbies'];
        break;
    }
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Card className="w-full border-0 shadow-none sm:border sm:shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl font-bold tracking-tight">
          {steps[currentStep].title}
        </CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
        <Progress value={progress} className="mt-4 max-w-sm mx-auto" />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {steps[currentStep].component}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {currentStep < totalSteps - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Suggestions...
                  </>
                ) : (
                  <>Get Career Suggestions</>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
