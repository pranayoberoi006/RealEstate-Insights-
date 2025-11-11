
"use server";

import {
  getPersonalizedGuidance,
  PersonalizedGuidanceInput,
  PersonalizedGuidanceOutput,
} from "@/ai/flows/personalized-guidance";
import {
  summarizePredictions,
} from "@/ai/flows/summarize-predictions";
import { predictPrice } from "@/ai/flows/predict-price";
import { z } from "zod";
import { 
    PersonalizedGuidanceFormSchema, 
    SummarizePredictionsInput, 
    SummarizePredictionsOutput,
    PricePredictionFormSchema,
    PricePredictionInput,
    PricePredictionOutput,
    AdvancedPricePredictionFormSchema,
    AdvancedPricePredictionInput,
    AdvancedPricePredictionOutput
} from "@/lib/types";

type GuidanceState = {
  formErrors?: z.ZodError<typeof PersonalizedGuidanceFormSchema>["formErrors"];
  guidance?: PersonalizedGuidanceOutput;
  errorMessage?: string;
};

export async function getPersonalizedGuidanceAction(
    prevState: GuidanceState,
    formData: FormData
): Promise<GuidanceState> {
    const validatedFields = PersonalizedGuidanceFormSchema.safeParse({
        realEstateGoal: formData.get("realEstateGoal"),
    });

    if (!validatedFields.success) {
        return {
            formErrors: validatedFields.error.formErrors,
        };
    }

    try {
        const guidance = await getPersonalizedGuidance(validatedFields.data as PersonalizedGuidanceInput);
        return { guidance };
    } catch (error) {
        console.error(error);
        return { errorMessage: "An unexpected error occurred. Please try again." };
    }
}


export async function getPredictionSummaryAction(input: SummarizePredictionsInput): Promise<SummarizePredictionsOutput> {
    return await summarizePredictions(input);
}


type PredictionState = {
    formErrors?: z.ZodError<typeof PricePredictionFormSchema>['formErrors'];
    prediction?: PricePredictionOutput;
    errorMessage?: string;
    submittedData?: PricePredictionInput;
};

export async function getPricePredictionAction(prevState: PredictionState, formData: FormData): Promise<PredictionState> {
    const validatedFields = PricePredictionFormSchema.safeParse({
        location: formData.get('location'),
        locationType: formData.get('locationType'),
        category: formData.get('category'),
        bedrooms: formData.get('bedrooms'),
        balconies: formData.get('balconies'),
        area: Number(formData.get('area')),
        predictFuture: formData.get('predictFuture') === 'on',
        parking: formData.get('parking') === 'on',
    });

    if (!validatedFields.success) {
        return {
            formErrors: validatedFields.error.formErrors,
        };
    }

    const submittedData = validatedFields.data;

    try {
        const prediction = await predictPrice(submittedData);

        return { prediction, submittedData };
    } catch (error) {
        console.error(error);
        return { errorMessage: "An unexpected error occurred while generating the prediction. Please try again." };
    }
}


type AdvancedPredictionState = {
    formErrors?: z.ZodError<typeof AdvancedPricePredictionFormSchema>['formErrors'];
    prediction?: AdvancedPricePredictionOutput;
    errorMessage?: string;
    submittedData?: AdvancedPricePredictionInput;
};


export async function getAdvancedPricePredictionAction(prevState: AdvancedPredictionState, formData: FormData): Promise<AdvancedPredictionState> {
    
    const totalFloors = formData.get('totalFloors');
    const floorNo = formData.get('floorNo');

    const validatedFields = AdvancedPricePredictionFormSchema.safeParse({
        location: formData.get('location'),
        locationType: formData.get('locationType'),
        category: formData.get('category'),
        bedrooms: formData.get('bedrooms'),
        balconies: formData.get('balconies'),
        area: Number(formData.get('area')),
        predictFuture: formData.get('predictFuture') === 'on',
        parking: formData.get('parking') === 'on',
        furnishedStatus: formData.get('furnishedStatus'),
        propertyAge: Number(formData.get('propertyAge')),
        totalFloors: totalFloors === 'none' ? 'none' : Number(totalFloors),
        floorNo: floorNo === 'none' ? 'none' : Number(floorNo),
        nearbyLandmarks: {
            metro: formData.get('metro') === 'on',
            school: formData.get('school') === 'on',
            hospital: formData.get('hospital') === 'on',
            airport: formData.get('airport') === 'on',
        }
    });

    if (!validatedFields.success) {
        return {
            formErrors: validatedFields.error.formErrors,
        };
    }

    const submittedData = validatedFields.data;

    try {
        const prediction = await predictPrice(submittedData);
        return { prediction, submittedData };
    } catch (error) {
        console.error(error);
        return { errorMessage: "An unexpected error occurred while generating the prediction. Please try again." };
    }
}
