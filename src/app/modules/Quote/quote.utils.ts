/* eslint-disable @typescript-eslint/no-explicit-any */





export const calculateOtherPrices = async (payload:any) => {
  
    const {refurbishSize, refurbishType, extendSize, finishLevel, bathrooms, windowSize, service, startTime} = payload

    // calculating total price
    const refurbishCost = refurbishSize.quantity * refurbishSize.price * refurbishType.percentage;
    const extendCost = extendSize.quantity * extendSize.price * finishLevel.percentage;
    const bathroomCost =  bathrooms.price * bathrooms.quantity || 0;
    const windowCost = windowSize.quantity * windowSize.price;
    const extendRefurbishArea = refurbishSize.quantity + extendSize.quantity;
    const interiorDesign = service.interiorDesign * extendRefurbishArea || 0;
    const architectural = service.architectural * extendRefurbishArea || 0;
    const structuralEngineering = service.structuralEngineering * extendRefurbishArea || 0;
    const planning = service.planning * extendRefurbishArea || 0;
    const startTimeCost = Number(startTime.percentage);
    const total = refurbishCost + extendCost + bathroomCost + windowCost + interiorDesign + architectural + structuralEngineering + planning;
    const startTimePrice = total * startTimeCost;


    payload.extendCost = extendCost;
    payload.refurbishCost = refurbishCost;
    payload.bathroomsPrice = payload.bathrooms.quantity * payload.bathrooms.price;
    payload.windowSizePrice = payload.windowSize.quantity * payload.windowSize.price;
    payload.startTimePrice = startTimePrice;
    payload.interiorDesign = interiorDesign;
    payload.architectural = architectural;
    payload.structuralEngineering = structuralEngineering;
    payload.planning = planning;
    payload.total = total + startTimePrice;

    return payload;

};