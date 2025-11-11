
'use server';

/**
 * @fileOverview A flow that predicts property prices.
 *
 * - predictPrice - A function that predicts property prices based on input.
 * - PricePredictionInput - The input type for the predictPrice function.
 * - PricePredictionOutput - The return type for the predictPrice function.
 */

import { ai } from '@/ai/genkit';
import {
  PricePredictionInputSchema,
  PricePredictionOutputSchema,
  type AdvancedPricePredictionInput,
  type PricePredictionOutput,
  type PricePredictionInput,
  AdvancedPricePredictionInputSchema,
} from '@/lib/types';


// A more sophisticated mock function to generate a plausible-looking price in INR.
const calculatePrice = (input: PricePredictionInput | AdvancedPricePredictionInput) => {
    const { area, category, locationType, bedrooms, balconies, parking } = input;

    // 1. Base price per square foot (adjusted for INR)
    const basePricePerSqFt = 5000 + Math.random() * 2000; // ₹5,000 - ₹7,000
    let calculatedPrice = area * basePricePerSqFt;

    // 2. Category multiplier
    const categoryMultipliers = {
        house: 1.2,
        apartment: 1.0,
        villa: 1.8,
        studio: 0.7,
        shop: 1.3,
    };
    calculatedPrice *= categoryMultipliers[category];

    // 3. Location multiplier
    if (locationType === 'urban') {
        calculatedPrice *= 1.75;
    } else {
        calculatedPrice *= 0.8;
    }

    // 4. Bedrooms bonus (for residential types)
    if (['house', 'apartment', 'villa'].includes(category) && bedrooms) {
        const bedroomBonus = {
            '1BHK': 200000,   // 2 Lakh
            '2BHK': 500000,   // 5 Lakh
            '3BHK': 1000000,  // 10 Lakh
            '4BHK+': 1500000, // 15 Lakh
        };
        calculatedPrice += bedroomBonus[bedrooms as keyof typeof bedroomBonus] || 0;
    }

    // 5. Balcony bonus
    if (balconies) {
        const balconyBonus = {
            '0': 0,
            '1': 150000,   // 1.5 Lakh
            '2': 300000,   // 3 Lakh
            '3': 500000,   // 5 Lakh
            '4+': 700000,  // 7 Lakh
        };
        calculatedPrice += balconyBonus[balconies as keyof typeof balconyBonus] || 0;
    }

    // 6. Parking bonus
    if (parking) {
        calculatedPrice += 400000; // 4 Lakh for parking
    }
    
    // 7. Advanced features for logged-in users
    if ('furnishedStatus' in input) {
        const advInput = input as AdvancedPricePredictionInput;

        // Furnishing status
        const furnishingBonus = {
            'fully-furnished': 1000000, // 10 Lakh
            'semi-furnished': 400000,   // 4 Lakh
            'unfurnished': 0,
        };
        calculatedPrice += furnishingBonus[advInput.furnishedStatus];

        // Property age depreciation (newer is better)
        const ageDepreciation = (5 - advInput.propertyAge) * 50000; // 50k per year newer
        calculatedPrice += ageDepreciation;
        
        // Floor level bonus (higher is better, to a point)
        if (advInput.floorNo !== 'none' && advInput.totalFloors !== 'none') {
            const floorRatio = advInput.floorNo / advInput.totalFloors;
            if (floorRatio > 0.5) { // Bonus for being on upper half
                calculatedPrice += 300000;
            }
             if (advInput.floorNo === advInput.totalFloors) { // Extra for penthouse
                calculatedPrice += 500000;
            }
        }

        // Landmark bonus
        const landmarks = advInput.nearbyLandmarks;
        if(landmarks.metro) calculatedPrice += 500000;
        if(landmarks.school) calculatedPrice += 300000;
        if(landmarks.hospital) calculatedPrice += 250000;
        if(landmarks.airport) calculatedPrice += 400000;
    }


    // Add some random noise to make it look more like a prediction
    calculatedPrice *= (0.95 + Math.random() * 0.1); // +/- 5%

    return Math.round(calculatedPrice / 1000) * 1000; // Round to nearest thousand
};

const predictPriceFlow = ai.defineFlow(
  {
    name: 'predictPriceFlow',
    inputSchema: PricePredictionInputSchema.or(AdvancedPricePredictionInputSchema),
    outputSchema: PricePredictionOutputSchema,
  },
  async (input) => {
    const predictedPrice = calculatePrice(input);
    const confidence = 0.80 + Math.random() * 0.15; // 80% - 95%
    
    let futurePredictedPrice: number | undefined = undefined;

    if ('predictFuture' in input && input.predictFuture) {
      // Simulate a 5-year price increase with compounding appreciation
      // Assume a random annual appreciation rate between 3% and 8%
      const annualAppreciation = 1 + (0.03 + Math.random() * 0.05);
      let futurePrice = predictedPrice;
      for (let i = 0; i < 5; i++) {
        futurePrice *= annualAppreciation;
      }
      futurePredictedPrice = Math.round(futurePrice / 1000) * 1000;
    }

    return {
      predictedPrice,
      futurePredictedPrice,
      confidence,
    };
  }
);


export async function predictPrice(
  input: PricePredictionInput | AdvancedPricePredictionInput
): Promise<PricePredictionOutput> {
  // Use the combined schema for validation within the flow
  const combinedSchema = PricePredictionInputSchema.or(AdvancedPricePredictionInputSchema);
  const validatedInput = combinedSchema.parse(input);
  return predictPriceFlow(validatedInput);
}
