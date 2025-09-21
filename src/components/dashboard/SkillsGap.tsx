'use client';

import type { SkillsGapAnalysisOutput } from '@/ai/flows/skills-gap-analysis';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ArrowRight, Info, Target, Check } from 'lucide-react';
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';

type SkillsGapProps = {
  gapAnalysis: SkillsGapAnalysisOutput;
  careerName: string;
  onContinue: () => void;
};

export default function SkillsGap({
  gapAnalysis,
  careerName,
  onContinue,
}: SkillsGapProps) {
  const allSkills = [
    ...new Set([
      ...gapAnalysis.missingSkills,
      ...gapAnalysis.overlapSkills,
    ]),
  ];

  const chartData = allSkills.map((skill) => ({
    skill,
    user: gapAnalysis.overlapSkills.includes(skill) ? 100 : 20,
    required: 100,
  }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Skills Gap Analysis for {careerName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your roadmap to becoming a{' '}
          <span className="font-bold text-primary">{careerName}</span> starts
          here.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Target className="h-6 w-6 text-destructive" />
              Skills to Develop
            </CardTitle>
            <CardDescription>
              Focus on acquiring these skills to boost your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {gapAnalysis.missingSkills.map((skill) => (
              <Badge key={skill} variant="destructive">
                {skill}
              </Badge>
            ))}
            {gapAnalysis.missingSkills.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No missing skills identified. Great job!
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-600" />
              Your Strengths
            </CardTitle>
            <CardDescription>
              You've already got these skills covered. Keep it up!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {gapAnalysis.overlapSkills.map((skill) => (
              <Badge
                key={skill}
                className="border-green-300 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-700"
              >
                {skill}
              </Badge>
            ))}
            {gapAnalysis.overlapSkills.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No overlapping skills found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {chartData.length > 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              Skill Coverage
            </CardTitle>
            <CardDescription>
              A visual representation of your skills against the requirements
              for a {careerName}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{}}
              className="mx-auto aspect-square max-h-[350px]"
            >
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <PolarGrid />
                <Radar
                  name="Your Skills"
                  dataKey="user"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Required"
                  dataKey="required"
                  stroke="hsl(var(--muted-foreground))"
                  fill="hsl(var(--muted))"
                  fillOpacity={0.4}
                  className="hidden"
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <Info className="h-6 w-6 text-primary" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
            {gapAnalysis.analysisSummary}
          </p>
        </CardContent>
      </Card>

      <div className="text-center pt-4">
        <Button onClick={onContinue} size="lg">
          Generate Personalized Roadmap <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
