/* eslint-disable @typescript-eslint/no-explicit-any */

  import { QuotePricing } from "../QuotePricing/QuotePricing.model";



export const calculateQuote = async (quote?: any) => {
  const formula = await QuotePricing.findOne(); // Fetch pricing data

  // Retrieve values from the database using Map's .get() method
  const refurbishSizeValue = formula?.refurbishSize.get(quote.refurbishSize.toString()) || formula?.refurbishSize.get('custom');
  const refurbishTypePersand = formula?.refurbishType.get(quote.refurbishType);
  const extendSizeValue = formula?.extendSize.get(quote.extendSize.toString()) || formula?.extendSize.get('custom');
  const finishLevelPersand = formula?.finishLevel.get(quote.finishLevel);
  const bathroomQuantity = formula?.bathroom.get(quote.bathrooms.toString());
  const windowSizeValue = formula?.window.get(quote.windowSize.toString()) || formula?.window.get('custom');
  const startTimeValue = formula?.startTime.get(quote.startTime);
  const fees = formula?.feesPerSqm;

  // Ensure values are defined before calculations
  if (
    refurbishSizeValue === undefined ||
    refurbishTypePersand === undefined ||
    extendSizeValue === undefined ||
    finishLevelPersand === undefined ||
    bathroomQuantity === undefined ||
    windowSizeValue === undefined ||
    startTimeValue === undefined ||
    !fees
  ) {
    console.error("Some required values are missing from the formula");
    return null;
  }
  // Calculate base costs
  const refurbishCost = refurbishSizeValue * refurbishTypePersand * quote.refurbishSize;
  const extendCost = extendSizeValue * finishLevelPersand * quote.extendSize;
  const bathroomCost = bathroomQuantity;
  const windowCost = windowSizeValue;

  // Calculate fees
  const interiorDesignFee = fees.interiorDesign * (quote.refurbishSize + quote.extendSize);
  const architecturalFee = fees.architectural * (quote.refurbishSize + quote.extendSize);
  const structuralFee = fees.structuralEngineering * (quote.refurbishSize + quote.extendSize);
  const planningFee = fees.planning * (quote.refurbishSize + quote.extendSize);


quote.refurbishTypePrice = refurbishTypePersand;
quote.refurbishSizePrice = refurbishSizeValue;
quote.extendSizePrice = extendSizeValue;
quote.finishLevelPrice = finishLevelPersand;
quote.bathroomsPrice = bathroomQuantity;
quote.windowSizePrice = windowSizeValue;
quote.startTimePrice = startTimeValue;
quote.otherPrice = {
  interiorDesign: fees.interiorDesign,
  architectural: fees.architectural,
  structuralEngineering: fees.structuralEngineering,
  planning: fees.planning,
};


  // Calculate total
  let total =
    refurbishCost +
    extendCost +
    bathroomCost +
    windowCost +
    interiorDesignFee +
    architecturalFee +
    structuralFee +
    planningFee;

  // Apply start time multiplier
  total *= startTimeValue;

  quote.total = total;

  return quote;
};
