
import { z } from "zod";

export const PersonalizedGuidanceFormSchema = z.object({
    realEstateGoal: z.string().min(10, "Please describe your goal in at least 10 characters.").max(500, "Your goal description is too long."),
});

export type PersonalizedGuidanceFormType = z.infer<typeof PersonalizedGuidanceFormSchema>;


export const PredictionHistoryItemSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  input: z.object({
    location: z.string(),
    category: z.string(),
    bedrooms: z.string().optional(),
    area: z.number(),
    locationType: z.string(),
    balconies: z.string().optional(),
    parking: z.boolean().optional(),
    furnishedStatus: z.string().optional(),
    propertyAge: z.number().optional(),
    totalFloors: z.union([z.number(), z.literal('none')]).optional(),
    floorNo: z.union([z.number(), z.literal('none')]).optional(),
    nearbyLandmarks: z.object({
        metro: z.boolean(),
        school: z.boolean(),
        hospital: z.boolean(),
        airport: z.boolean(),
    }).optional(),
  }),
  output: z.object({
    predictedPrice: z.number(),
    futurePredictedPrice: z.number().optional(),
    confidence: z.number(),
  }),
});
export type PredictionHistoryItem = z.infer<typeof PredictionHistoryItemSchema>;

export const SummarizePredictionsInputSchema = z.object({
  history: z.array(PredictionHistoryItemSchema),
});
export type SummarizePredictionsInput = z.infer<
  typeof SummarizePredictionsInputSchema
>;

export const SummarizePredictionsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A short, insightful summary of the user\'s past property price predictions.'),
});
export type SummarizePredictionsOutput = z.infer<
  typeof SummarizePredictionsOutputSchema
>;

const PricePredictionBaseSchema = z.object({
    location: z.string().min(2, "Please enter a valid location."),
    locationType: z.enum(['urban', 'rural']),
    category: z.enum(['house', 'apartment', 'villa', 'studio', 'shop']),
    bedrooms: z.string().optional(),
    balconies: z.string().optional(),
    area: z.number().min(100, "Area must be at least 100 sq ft."),
    predictFuture: z.boolean().default(false),
    parking: z.boolean().default(false),
});

export const PricePredictionFormSchema = PricePredictionBaseSchema.refine(data => {
    if ((data.category === 'house' || data.category === 'apartment' || data.category === 'villa') && !data.bedrooms) {
        return false;
    }
    return true;
}, {
    message: "Bedrooms are required for this property type.",
    path: ["bedrooms"],
});

export type PricePredictionFormType = z.infer<typeof PricePredictionFormSchema>;

export const PricePredictionInputSchema = PricePredictionFormSchema;
export type PricePredictionInput = z.infer<typeof PricePredictionInputSchema>;


export const PricePredictionOutputSchema = z.object({
    predictedPrice: z.number().describe("The estimated current market value of the property."),
    futurePredictedPrice: z.number().optional().describe("The estimated market value of the property in 5 years."),
    confidence: z.number().describe("The model's confidence in the prediction, from 0 to 1."),
});
export type PricePredictionOutput = z.infer<typeof PricePredictionOutputSchema>;


export const AdvancedPricePredictionFormSchema = PricePredictionBaseSchema.extend({
    furnishedStatus: z.enum(['fully-furnished', 'semi-furnished', 'unfurnished']),
    propertyAge: z.number().min(0).max(100),
    totalFloors: z.number().min(0).max(200).or(z.literal('none')),
    floorNo: z.number().min(0).max(200).or(z.literal('none')),
    nearbyLandmarks: z.object({
        metro: z.boolean().default(false),
        school: z.boolean().default(false),
        hospital: z.boolean().default(false),
        airport: z.boolean().default(false),
    }).default({}),
}).refine(data => {
    if (data.totalFloors !== 'none' && data.floorNo !== 'none' && data.floorNo > data.totalFloors) {
        return false;
    }
    return true;
}, {
    message: 'Floor number cannot be greater than total floors.',
    path: ['floorNo'],
}).refine(data => {
    if ((data.category === 'house' || data.category === 'apartment' || data.category === 'villa') && !data.bedrooms) {
        return false;
    }
    return true;
}, {
    message: "Bedrooms are required for this property type.",
    path: ["bedrooms"],
});


export const AdvancedPricePredictionInputSchema = AdvancedPricePredictionFormSchema;
export type AdvancedPricePredictionInput = z.infer<typeof AdvancedPricePredictionInputSchema>;


export const AdvancedPricePredictionOutputSchema = PricePredictionOutputSchema;
export type AdvancedPricePredictionOutput = z.infer<typeof AdvancedPricePredictionOutputSchema>;
