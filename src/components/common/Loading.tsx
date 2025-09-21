import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <div className="space-y-2">
        <h2 className="font-headline text-3xl font-bold">
          Crafting Your Future...
        </h2>
        <p className="max-w-md text-muted-foreground">
          Our AI is analyzing your profile to create tailored recommendations. This
          may take just a moment.
        </p>
      </div>
    </div>
  );
}
