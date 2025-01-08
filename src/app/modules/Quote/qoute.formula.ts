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

//   console.log(
//     refurbishSizeValue,
//     "refurbishSizeValue",
//     refurbishTypePersand,
//     "refurbishTypePersand",
//     extendSizeValue,
//     "extendSizeValue",
//     finishLevelPersand,
//     "finishLevelPersand",
//     bathroomQuantity,
//     "bathroomQuantity",
//     windowSizeValue,
//     "windowSizeValue",
//     startTimeValue,
//     "startTimeValue",
//     fees,
//     "fees"
//   );

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

//   console.log(
//     refurbishCost,
//     "refurbishCost",
//     extendCost,
//     "extendCost",
//     bathroomCost,
//     "bathroomCost",
//     windowCost,
//     "windowCost",
//     interiorDesignFee,
//     "interiorDesignFee",
//     architecturalFee,
//     "architecturalFee",
//     structuralFee,
//     "structuralFee",
//     planningFee,
//     "planningFee"
//   );

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


  return total;
};
