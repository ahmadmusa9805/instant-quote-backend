/* eslint-disable @typescript-eslint/no-explicit-any */


export const calculateOtherPrices = async (payload?: any) => {
    let  interiorDesign =  30;
    let  architectural =  25;
    let  structuralEngineering =  50;
    let  planning =  40;


    console.log(payload,  "payload");	
    // calculating total price
    const refurbishCost = payload.refurbishSize.quantity * payload.refurbishSize.price * payload.refurbishType.percentage;
    const extendCost = payload.extendSize.quantity * payload.extendSize.price * payload.finishLevel.percentage;
    const bathroomCost = payload.bathrooms.quantity * payload.bathrooms.price;
    const windowCost = payload.windowSize.quantity * payload.windowSize.price;
    
    
    const startTimeCost = payload.startTime.percentage;

    const totalArea = payload.refurbishSize.quantity + payload.extendSize.quantity;
    interiorDesign *= totalArea;
    architectural *= totalArea;
    structuralEngineering *= totalArea;
    planning *= totalArea;

    const total = refurbishCost + extendCost + bathroomCost + windowCost  + interiorDesign + architectural + structuralEngineering + planning;
    const startTimePrice = total * startTimeCost;

    payload.refurbishSizePrice = payload.refurbishSize.quantity * payload.refurbishSize.price;
    payload.extendSizePrice = payload.extendSize.quantity * payload.extendSize.price;
    payload.bathroomsPrice = payload.bathrooms.quantity * payload.bathrooms.price;
    payload.windowSizePrice = payload.windowSize.quantity * payload.windowSize.price;
    payload.startTimePrice = startTimePrice;

    payload.otherPrice = {
        interiorDesign,
        architectural,
        structuralEngineering,
        planning,
      };
      payload.extendCost = extendCost;
      payload.refurbishCost = refurbishCost;
    payload.total = total + startTimePrice;


    return payload;

};
