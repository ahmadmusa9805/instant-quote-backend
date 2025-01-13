/* eslint-disable @typescript-eslint/no-explicit-any */


export const calculateOtherPrices = async (payload?: any) => {


    // calculating total price
    const refurbishCost = payload.refurbishSize.quantity * payload.refurbishSize.price * payload.refurbishType.percentage;
    const extendCost = payload.extendSize.quantity * payload.extendSize.price * payload.finishLevel.percentage;
    const bathroomCost = payload.bathrooms.quantity * payload.bathrooms.price;
    const windowCost = payload.windowSize.quantity * payload.windowSize.price;
    const extendRefurbishArea = payload.refurbishSize.quantity + payload.extendSize.quantity;
    const interiorDesign = payload.service.interiorDesign * extendRefurbishArea || 0;
    const architectural = payload.service.architectural * extendRefurbishArea || 0;
    const structuralEngineering = payload.service.structuralEngineering * extendRefurbishArea || 0;
    const planning = payload.service.planning * extendRefurbishArea || 0;
    const startTimeCost = Number(payload.startTime.percentage);


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
