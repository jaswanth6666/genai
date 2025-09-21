import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  GraduationCap,
  Lightbulb,
  Search,
  FileText,
  MessageCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import Header from '@/components/common/Header';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'AI Career Suggestion',
    description: 'Get personalized career paths based on your unique profile.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Skills Gap Analysis',
    description: 'Identify the exact skills you need for your dream job.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Personalized Roadmap',
    description: 'Receive a step-by-step learning plan to achieve your goals.',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Resume Builder',
    description: 'Create professional resumes tailored to your career path.',
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    title: 'Multilingual Chatbot',
    description: 'Instant guidance in English, Hindi, and more languages.',
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'Student Profiling',
    description: 'Build a comprehensive profile to kickstart your journey.',
  },
];

const heroImage = PlaceHolderImages.find(
  (image) => image.id === 'hero-student'
);

export default function Home() {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Chart Your Course.
                    <br />
                    <span className="text-gradient">Define Your Future.</span>
                  </h1>
                  <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                    DishaCoach is your AI-powered compass for navigating the
                    complex world of career choices. We help Indian students
                    find clarity and build a personalized roadmap to success.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={600}
                    className="aspect-square w-full max-w-md rounded-full object-cover shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full bg-muted/50 py-20 md:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  Our Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your Complete Career Guidance System
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From self-discovery to job readiness, DishaCoach provides a
                  holistic suite of tools to empower every step of your journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group flex transform flex-col border-border/50 bg-card/50 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:bg-card"
                >
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className="rounded-full bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary">
                      <feature.icon.type
                        {...feature.icon.props}
                        className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                      />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 DishaCoach. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
