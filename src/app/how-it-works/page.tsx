'use client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { AdvancedPricePredictionForm } from "@/components/AdvancedPricePredictionForm";
import { PricePredictionForm } from '@/components/PricePredictionForm';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function HowItWorksPage() {
    const { user, loading } = useAuth();
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          How RealEstate Insights Works
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          We combine vast amounts of real estate data with powerful AI to provide you with unparalleled market intelligence. Here’s a glimpse into our process.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
            <span className="text-2xl font-bold">1</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 font-headline">Data Aggregation</h3>
          <p className="text-muted-foreground">We collect and process millions of property listings, public records, and market trends from a multitude of sources.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
            <span className="text-2xl font-bold">2</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 font-headline">AI Analysis</h3>
          <p className="text-muted-foreground">Our machine learning models analyze the data to identify patterns, predict future prices, and calculate property valuations with high accuracy.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
            <span className="text-2xl font-bold">3</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 font-headline">Actionable Insights</h3>
          <p className="text-muted-foreground">We present our findings through an intuitive interface, giving you clear, actionable insights to inform your real estate decisions.</p>
        </div>
      </div>

      <div className="bg-muted/20 rounded-lg p-8 mb-12">
        <div className="text-center mb-8">
            <h2 className="font-headline text-3xl font-bold">Get a Quick Price Prediction</h2>
             <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Use our basic prediction tool, available for everyone. Enter a few details to get a quick estimate of a property's value.
            </p>
        </div>
        <PricePredictionForm />
      </div>

      <Separator className="my-12" />

      <div className="bg-muted/40 rounded-lg p-8">
        <div className="text-center mb-8">
            <h2 className="font-headline text-3xl font-bold">Property Details For More Accuracy</h2>
             <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                {user ? "Fill in the details below and our AI will estimate your property's value with advanced precision." : "Log in to access our advanced prediction tool with more detailed inputs for a more accurate valuation."}
            </p>
        </div>
        {!loading && user && (
            <AdvancedPricePredictionForm />
        )}
        {!loading && !user && (
            <div className='text-center space-y-4'>
                <p className='text-foreground'>Please log in to use the advanced price predictor.</p>
                <div className='flex gap-4 justify-center'>
                    <Button asChild>
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
