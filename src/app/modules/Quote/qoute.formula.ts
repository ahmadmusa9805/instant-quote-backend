import { QuotePricing } from "../QuotePricing/QuotePricing.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const calculateQuote = async (quote?:any) => {
    const formula = await QuotePricing.findOne(); // Fetch pricing data
    
    console.log(quote, "quote");
    console.log(formula, "pricing");

    // Retrieve values from the database
    const refurbishSizeValue = formula?.refurbishSize[quote.refurbishSize] || formula?.refurbishSize['custom'];
    const refurbishTypePersand = formula?.refurbishType[quote.refurbishType];
    const extendSizeValue = formula?.extendSize[quote.extendSize] || formula?.extendSize['custom'];
    const finishLevelPersand = formula?.finishLevel[quote.finishLevel];
    const bathroomQuantity = formula?.bathroom[quote.bathrooms];
    const windowSizeValue = formula?.window[quote.windowSize] || formula?.window['custom'];
    const startTimeValue = formula?.startTime[quote.startTime];
    const fees = formula?.feesPerSqm;
  
    console.log(refurbishSizeValue, "refurbishSizeValue", refurbishTypePersand, "refurbishTypePersand", extendSizeValue, "extendSizeValue", finishLevelPersand, "finishLevelPersand", bathroomQuantity, "bathroomQuantity", windowSizeValue, "windowSizeValue", startTimeValue, "startTimeValue", fees, "fees");


    // Calculate base costs
    const refurbishCost = refurbishSizeValue as number * (refurbishTypePersand as number) * quote.refurbishSize;
    const extendCost = extendSizeValue as number * (finishLevelPersand as number) * quote.extendSize;
    // const finishCost = (refurbishCost + extendCost) * finishMultiplier;
    // const finishCost =  extendCost * finishMultiplier;
    const bathroomCost = bathroomQuantity;
    const windowCost = windowSizeValue;
    
    // Calculate fees
    const interiorDesignFee = fees?.interiorDesign as number * (quote.refurbishSize + quote.extendSize);
    const architecturalFee = fees?.architectural as number * (quote.refurbishSize + quote.extendSize);
    const structuralFee = fees?.structuralEngineering as number * (quote.refurbishSize + quote.extendSize);
    const planningFee = fees?.planning as number * (quote.refurbishSize + quote.extendSize);
  


    console.log(refurbishCost, "refurbishCost", extendCost, "extendCost", bathroomCost, "bathroomCost", windowCost, "windowCost", interiorDesignFee, "interiorDesignFee", architecturalFee, "architecturalFee", structuralFee, "structuralFee", planningFee, "planningFee");

    // Calculate total
    let total = refurbishCost + extendCost + (bathroomCost as number) + (windowCost as number) + interiorDesignFee + architecturalFee + structuralFee + planningFee;
  
    // Apply start time multiplier
    total *= startTimeValue as number;
  

    console.log(total, "last");

    return total;
  };
  