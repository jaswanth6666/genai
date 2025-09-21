import type { AICareerSuggestionOutput } from '@/ai/flows/ai-career-suggestion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Forward, Info, TrendingUp } from 'lucide-react';
import { Progress } from '../ui/progress';

type CareerSuggestionsProps = {
  suggestions: AICareerSuggestionOutput;
  onSelect: (career: string) => void;
};

export default function CareerSuggestions({
  suggestions,
  onSelect,
}: CareerSuggestionsProps) {
  const getBadgeColor = (score: number) => {
    if (score > 85) return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-200 dark:border-green-700';
    if (score > 70) return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-200 dark:border-yellow-700';
    return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/50 dark:text-amber-200 dark:border-amber-700';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Your Personalized Career Suggestions
        </h1>
        <p className="mt-2 text-muted-foreground">
          Based on your profile, here are a few paths that might be a great fit
          for you.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suggestions.suggestedCareers.map(({ career, matchScore }) => (
            <Card key={career} className="group flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="font-headline flex items-center gap-3">
                    <BrainCircuit className="h-7 w-7 text-primary" />
                    {career}
                  </CardTitle>
                   <Badge className={getBadgeColor(matchScore)}>
                     <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
                     {matchScore}%
                   </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Match Score</span>
                    <span>{matchScore}%</span>
                  </div>
                  <Progress value={matchScore} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => onSelect(career)} className="w-full">
                  Analyze Skills Gap <Forward className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-3 text-xl">
            <Info className="h-6 w-6 text-primary"/>
            AI Rationale
          </CardTitle>
          <CardDescription>
            Here's the reasoning behind these career suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
            {suggestions.rationale}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
