import type { PersonalizedRoadmapGenerationOutput } from '@/ai/flows/personalized-roadmap-generation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, ExternalLink, RefreshCw, Milestone } from 'lucide-react';

type LearningRoadmapProps = {
  roadmap: PersonalizedRoadmapGenerationOutput;
  careerName: string;
  onRestart: () => void;
};

export default function LearningRoadmap({
  roadmap,
  careerName,
  onRestart,
}: LearningRoadmapProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
          <Milestone className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Your Personalized Learning Roadmap
        </h1>
        <p className="mt-2 text-muted-foreground">
          A step-by-step guide to becoming a{' '}
          <span className="font-bold text-primary">{careerName}</span>.
        </p>
      </div>

      <Card className="border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            Actionable Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {roadmap.roadmap.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-4">
                    <span className="flex items-center gap-3 text-lg">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      {item.step}
                    </span>
                    <Badge variant="outline" className="hidden sm:flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {item.estimatedTime}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4 pl-14">
                  <p className="text-muted-foreground">{item.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                    <ul className="mt-2 space-y-2">
                      {item.resources.map((resource, rIndex) => (
                        <li key={rIndex} className="text-sm">
                          {resource.startsWith('http') ? (
                            <a
                              href={resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 transition-colors hover:bg-primary/10 hover:text-primary"
                            >
                              {new URL(resource).hostname} <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground">{resource}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <div className="text-center pt-4">
        <Button onClick={onRestart} variant="outline" size="lg">
          <RefreshCw className="mr-2 h-4 w-4" /> Start Over
        </Button>
      </div>
    </div>
  );
}
