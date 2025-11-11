
'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getAdvancedPricePredictionAction } from '@/app/actions';
import { type AdvancedPricePredictionInput } from '@/lib/types';
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
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, Terminal } from 'lucide-react';
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

export function AdvancedPricePredictionForm() {
  const { user } = useAuth();
  const [state, formAction] = useFormState(getAdvancedPricePredictionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState('house');
  const [totalFloors, setTotalFloors] = useState<string | number>('10');

  const locations = [
    "Amaravati", "Amritsar", "Banglore", "Bhopal", "Bhubaneswar", "Chandigarh", 
    "Chennai", "Dehradun", "Delhi", "Dharamshala", "Gujarat", "Gurugram", 
    "Hyderabad", "Jaipur", "Kashmir", "Kolkata", "Kurukshetra", "Leh", "Lucknow", 
    "Mumbai", "Panaji", "Patna", "Puducherry", "Raipur", "Ranchi", "Shimla", 
    "Thiruvananthauram"
  ].sort();

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
      history.unshift(historyItem);
      localStorage.setItem(`predictionHistory_${user.uid}`, JSON.stringify(history.slice(0, 10)));
    }
  }, [state.prediction, state.submittedData, user]);

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-2">
        <form
            ref={formRef}
            action={formAction}
            className="grid gap-4"
        >
            <Card>
                <CardHeader>
                    <CardTitle className='font_headline'>Advanced Property Details</CardTitle>
                    <CardDescription>Enter more detailed information for a refined prediction.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                    {/* Basic Fields */}
                    <div className="space-y-2">
                        <Label htmlFor="location">Location / City</Label>
                        <Select name="location" defaultValue="Delhi" required>
                            <SelectTrigger><SelectValue placeholder="Select a location" /></SelectTrigger>
                            <SelectContent>{locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="area">Area (sq ft)</Label>
                        <Input id="area" name="area" type="number" placeholder="e.g., 1800" required defaultValue={1200} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="locationType">Location Type</Label>
                        <Select name="locationType" defaultValue="urban">
                            <SelectTrigger><SelectValue placeholder="Select a location type" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="urban">Urban</SelectItem>
                                <SelectItem value="rural">Rural</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue="house" onValueChange={setCategory}>
                             <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
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
                                    <SelectTrigger><SelectValue placeholder="Select bedrooms" /></SelectTrigger>
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
                                    <SelectTrigger><SelectValue placeholder="Select balconies" /></SelectTrigger>
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
                    {/* Advanced Fields */}
                    <div className="space-y-2">
                        <Label htmlFor="furnishedStatus">Furnishing</Label>
                        <Select name="furnishedStatus" defaultValue="semi-furnished">
                            <SelectTrigger><SelectValue placeholder="Select furnishing" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fully-furnished">Fully Furnished</SelectItem>
                                <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                                <SelectItem value="unfurnished">Unfurnished</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="propertyAge">Age of Property (years)</Label>
                        <Select name="propertyAge" defaultValue="3">
                            <SelectTrigger><SelectValue placeholder="Select age" /></SelectTrigger>
                            <SelectContent>
                                {[...Array(6)].map((_, i) => <SelectItem key={i} value={String(i)}>{i === 0 ? "New Construction" : `${i} year${i > 1 ? 's' : ''}`}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="totalFloors">Total Floors in Building</Label>
                         <Select name="totalFloors" defaultValue="10" onValueChange={(val) => setTotalFloors(val)}>
                            <SelectTrigger><SelectValue placeholder="Select total floors" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">N/A (e.g. House)</SelectItem>
                                {[...Array(21)].map((_, i) => <SelectItem key={i} value={String(i)}>{i}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    {totalFloors !== 'none' && (
                         <div className="space-y-2">
                            <Label htmlFor="floorNo">Floor Number</Label>
                            <Select name="floorNo" defaultValue="5">
                                <SelectTrigger><SelectValue placeholder="Select floor number" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">N/A</SelectItem>
                                     {totalFloors !== 'none' && [...Array(Number(totalFloors) + 1)].map((_, i) => <SelectItem key={i} value={String(i)}>{i}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            {state.formErrors?.fieldErrors?.floorNo && <p className='text-xs text-destructive mt-1'>{state.formErrors?.fieldErrors?.floorNo[0]}</p>}
                        </div>
                    )}
                     <div className="md:col-span-2 space-y-2">
                        <Label>Nearby Landmarks</Label>
                        <div className="flex flex-wrap gap-4 items-center rounded-lg border p-3">
                           <div className="flex items-center gap-2"><Checkbox id="metro" name="metro" /><Label htmlFor="metro">Metro</Label></div>
                           <div className="flex items-center gap-2"><Checkbox id="school" name="school" /><Label htmlFor="school">School</Label></div>
                           <div className="flex items-center gap-2"><Checkbox id="hospital" name="hospital" /><Label htmlFor="hospital">Hospital</Label></div>
                           <div className="flex items-center gap-2"><Checkbox id="airport" name="airport" /><Label htmlFor="airport">Airport</Label></div>
                        </div>
                    </div>
                    
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
                    <CardTitle className='font-headline'>Advanced Prediction Result</CardTitle>
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
