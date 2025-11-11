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

// 🧠 Function to calculate a realistic price
const calculatePrice = (input: PricePredictionInput | AdvancedPricePredictionInput) => {
  const { area, category, locationType, bedrooms, balconies, parking } = input;

  const basePricePerSqFt = 5000 + Math.random() * 2000; // ₹5,000 - ₹7,000
  let calculatedPrice = area * basePricePerSqFt;

  // Category multiplier
  const categoryMultipliers = {
    house: 1.2,
    apartment: 1.0,
    villa: 1.8,
    studio: 0.7,
    shop: 1.3,
  };
  calculatedPrice *= categoryMultipliers[category];

  // Location multiplier
  calculatedPrice *= locationType === 'urban' ? 1.75 : 0.8;

  // Bedroom bonus
  if (['house', 'apartment', 'villa'].includes(category) && bedrooms) {
    const bedroomBonus = {
      '1BHK': 200000,
      '2BHK': 500000,
      '3BHK': 1000000,
      '4BHK+': 1500000,
    };
    calculatedPrice += bedroomBonus[bedrooms as keyof typeof bedroomBonus] || 0;
  }

  // Balcony bonus
  if (balconies) {
    const balconyBonus = {
      '0': 0,
      '1': 150000,
      '2': 300000,
      '3': 500000,
      '4+': 700000,
    };
    calculatedPrice += balconyBonus[balconies as keyof typeof balconyBonus] || 0;
  }

  // Parking bonus
  if (parking) calculatedPrice += 400000;

  // Advanced input logic
  if ('furnishedStatus' in input) {
    const advInput = input as AdvancedPricePredictionInput;

    // Furnishing
    const furnishingBonus = {
      'fully-furnished': 1000000,
      'semi-furnished': 400000,
      'unfurnished': 0,
    };
    calculatedPrice += furnishingBonus[advInput.furnishedStatus];

    // Age depreciation
    calculatedPrice += (5 - advInput.propertyAge) * 50000;

    // Floor logic
    if (advInput.floorNo !== 'none' && advInput.totalFloors !== 'none') {
      const floorRatio = advInput.floorNo / advInput.totalFloors;
      if (floorRatio > 0.5) calculatedPrice += 300000;
      if (advInput.floorNo === advInput.totalFloors) calculatedPrice += 500000;
    }

    // Landmarks
    const landmarks = advInput.nearbyLandmarks;
    if (landmarks.metro) calculatedPrice += 500000;
    if (landmarks.school) calculatedPrice += 300000;
    if (landmarks.hospital) calculatedPrice += 250000;
    if (landmarks.airport) calculatedPrice += 400000;
  }

  // Random small variation
  calculatedPrice *= 0.95 + Math.random() * 0.1;

  return Math.round(calculatedPrice / 1000) * 1000;
};

const predictPriceFlow = ai.defineFlow(
  {
    name: 'predictPriceFlow',
    inputSchema: PricePredictionInputSchema.or(AdvancedPricePredictionInputSchema),
    outputSchema: PricePredictionOutputSchema,
  },
  async (input) => {
    const predictedPrice = calculatePrice(input);
    const confidence = 0.8 + Math.random() * 0.15;

    let futurePredictedPrice: number | undefined = undefined;
    if ('predictFuture' in input && input.predictFuture) {
      const annualAppreciation = 1 + (0.03 + Math.random() * 0.05);
      let futurePrice = predictedPrice;
      for (let i = 0; i < 5; i++) futurePrice *= annualAppreciation;
      futurePredictedPrice = Math.round(futurePrice / 1000) * 1000;
    }

    // ✅ Proper INR formatting (but keep raw numbers too)
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(predictedPrice);

    const formattedFuturePrice = futurePredictedPrice
      ? new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 2,
        }).format(futurePredictedPrice)
      : undefined;

    // ✅ Return both formatted (string) and numeric (for internal use)
    return {
      predictedPrice,
      formattedPrice, // e.g. ₹2,45,00,000.00
      futurePredictedPrice,
      formattedFuturePrice,
      confidence,
    };
  }
);

export async function predictPrice(
  input: PricePredictionInput | AdvancedPricePredictionInput
): Promise<PricePredictionOutput> {
  const combinedSchema = PricePredictionInputSchema.or(AdvancedPricePredictionInputSchema);
  const validatedInput = combinedSchema.parse(input);
  return predictPriceFlow(validatedInput);
}
