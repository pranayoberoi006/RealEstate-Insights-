
'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getPricePredictionAction } from '@/app/actions';
import { type PricePredictionInput } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, Lightbulb, Terminal } from 'lucide-react';
import Link from 'next/link';
import { PredictionChart } from './PredictionChart';
import { useState } from 'react';

const initialState = {
    formErrors: undefined,
    prediction: undefined,
    errorMessage: undefined,
    submittedData: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Predicting...
        </>
      ) : (
        'Predict Price'
      )}
    </Button>
  );
}

export function PricePredictionForm() {
  const { user, loading } = useAuth();
  const [state, formAction] = useFormState(getPricePredictionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState('house');

  const locations = [
    "Amaravati", "Amritsar", "Banglore", "Bhopal", "Bhubaneswar", "Chandigarh", 
    "Chennai", "Dehradun", "Delhi", "Dharamshala", "Gujarat", "Gurugram", 
    "Hyderabad", "Jaipur", "Kashmir", "Kolkata", "Kurukshetra", "Leh", "Lucknow", 
    "Mumbai", "Panaji", "Patna", "Puducherry", "Raipur", "Ranchi", "Shimla", 
    "Thiruvananthauram"
  ].sort();

  // Store prediction history in localStorage only if user is logged in
  useEffect(() => {
    if (state.prediction && state.submittedData && user) {
      const historyItem = {
        id: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        input: state.submittedData,
        output: state.prediction,
      };
      
      const existingHistory = localStorage.getItem(`predictionHistory_${user.uid}`);
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(historyItem); // Add new item to the beginning
      localStorage.setItem(`predictionHistory_${user.uid}`, JSON.stringify(history.slice(0, 10))); // Keep last 10
    }
  }, [state.prediction, state.submittedData, user]);

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-2">
        <form
            ref={formRef}
            action={formAction}
            className="grid gap-4"
        >
            <Card>
                <CardHeader>
                    <CardTitle className='font_headline'>Property Details</CardTitle>
                    <CardDescription>Enter the information about the property to get a prediction.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location / City</Label>
                        <Select name="location" defaultValue="Delhi" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map(loc => (
                                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="area">Area (sq ft)</Label>
                        <Input id="area" name="area" type="number" placeholder="e.g., 1800" required defaultValue={1200} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="locationType">Location Type</Label>
                        <Select name="locationType" defaultValue="urban">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a location type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="urban">Urban</SelectItem>
                                <SelectItem value="rural">Rural</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue="house" onValueChange={setCategory}>
                             <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="studio">Studio</SelectItem>
                                <SelectItem value="shop">Shop</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {(category === 'house' || category === 'apartment' || category === 'villa') && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="bedrooms">Bedrooms</Label>
                                <Select name="bedrooms" defaultValue="3BHK">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select bedrooms" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1BHK">1 BHK</SelectItem>
                                        <SelectItem value="2BHK">2 BHK</SelectItem>
                                        <SelectItem value="3BHK">3 BHK</SelectItem>
                                        <SelectItem value="4BHK+">4+ BHK</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="balconies">Balconies</Label>
                                <Select name="balconies" defaultValue="1">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select balconies" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">None</SelectItem>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4+">4+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                    
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 md:col-span-2">
                        <div className="space-y-0.5">
                            <Label htmlFor="predictFuture">5-Year Price Forecast</Label>
                            <p className="text-sm text-muted-foreground">
                            Include an AI-powered prediction for the property's value in 5 years.
                            </p>
                        </div>
                        <Switch id="predictFuture" name="predictFuture" />
                    </div>

                     <div className="flex flex-row items-center justify-between rounded-lg border p-3 md:col-span-2">
                        <div className="space-y-0.5">
                            <Label htmlFor="parking">Parking Available</Label>
                            <p className="text-sm text-muted-foreground">
                               Does the property include a dedicated parking spot?
                            </p>
                        </div>
                        <Switch id="parking" name="parking" />
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
        
        {state.errorMessage && (
            <Alert variant="destructive" className="lg:col-span-1">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.errorMessage}</AlertDescription>

            </Alert>
        )}

        {state.prediction && state.submittedData && (
             <Card className='lg:col-span-1'>
                <CardHeader>
                    <CardTitle className='font-headline'>Prediction Result</CardTitle>
                    <CardDescription>
                        Based on a {state.submittedData.bedrooms ? `${state.submittedData.bedrooms} ` : ''}{state.submittedData.category} of {state.submittedData.area} sq ft in a(n) {state.submittedData.locationType} area of {state.submittedData.location}.
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <PredictionChart prediction={state.prediction} />
                     <p className='text-xs text-muted-foreground mt-2 text-center'>Confidence: {Math.round(state.prediction.confidence * 100)}%</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
