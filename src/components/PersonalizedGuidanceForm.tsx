"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getPersonalizedGuidanceAction } from "@/app/actions";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Lightbulb, Terminal } from "lucide-react";

const initialState = {};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Generating Advice..." : "Get Advice"}
        </Button>
    );
}

export function PersonalizedGuidanceForm() {
    const [state, formAction] = useFormState(
        getPersonalizedGuidanceAction,
        initialState
    );
    
    return (
        <form action={formAction} className="max-w-xl mx-auto space-y-4">
            <div>
                <Textarea
                    id="realEstateGoal"
                    name="realEstateGoal"
                    placeholder="e.g., 'I want to find a 3-bedroom house in a good school district for under $800,000.'"
                    className="min-h-[100px]"
                />
                {state?.formErrors?.fieldErrors?.realEstateGoal && (
                    <p className="text-xs text-destructive mt-1">{state.formErrors.fieldErrors.realEstateGoal[0]}</p>
                )}
            </div>
            <div className="flex justify-center">
                <SubmitButton />
            </div>

            {state.errorMessage && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.errorMessage}</AlertDescription>
                </Alert>
            )}

            {state.guidance && (
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle className="font-headline">Your Personalized Guidance</AlertTitle>
                    <AlertDescription>
                        {state.guidance.guidanceText}
                    </AlertDescription>
                </Alert>
            )}
        </form>
    );
}
