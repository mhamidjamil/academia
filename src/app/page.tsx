import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, ArrowRight, BookOpenCheck, BarChart, FileText, Bell } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center p-6 text-center">
    <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">{icon}</div>
    <h3 className="mb-2 font-headline text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="no-print container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold">Academia Center</span>
          </Link>
          <nav>
            <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative bg-background">
          <div className="container flex flex-col items-center justify-center space-y-8 py-20 text-center md:py-32">
            <div className="absolute inset-0 -z-10 mx-auto h-full w-full max-w-7xl bg-[radial-gradient(circle_400px_at_50%_300px,_#F0808020,_transparent)]"></div>
            <h1 className="max-w-4xl font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              The Future of School Management is Here
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Academia Center provides an all-in-one solution to streamline school operations, enhance collaboration, and foster student success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/dashboard">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">Why Choose Academia Center?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Everything you need to manage your institution efficiently.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<BookOpenCheck size={32} />} 
                title="Unified Platform"
                description="Manage students, classes, exams, and fees from a single, intuitive dashboard." 
              />
              <FeatureCard 
                icon={<BarChart size={32} />} 
                title="Insightful Analytics" 
                description="Generate marksheets, track performance, and gain valuable insights with powerful reporting tools." 
              />
              <FeatureCard 
                icon={<Bell size={32} />} 
                title="Seamless Communication" 
                description="Keep everyone informed with a centralized noticeboard and calendar for important updates." 
              />
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-20 md:py-24">
          <div className="container">
            <Card className="w-full max-w-4xl mx-auto shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Ready to Transform Your School?</CardTitle>
                <CardDescription className="text-lg">
                  Join hundreds of institutions already thriving with Academia Center.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Access Your Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-6 md:px-8 md:py-0 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Academia Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
