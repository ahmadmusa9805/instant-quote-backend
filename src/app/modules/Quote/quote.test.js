/* eslint-disable @typescript-eslint/no-explicit-any */
const ob = {
        property: "Apartment",
        propertyPart: "Living Room",
        refurbishType: {
            type: "full",
            percentage: 2
        },
        refurbishSize: {
            quantity: 25,
            price: 1000
        },
        extendSize: {
            quantity: 20,
            price: 2100
        },
        finishLevel: {
            level: "low",
            percentage: 0.7
        },
        bathrooms: {
            quantity: 2,
            price: 8000
        },
        windowSize: {
            quantity: 10,
            price: 580
        },
        startTime: {
            startTime: "asap",
            percentage: 0.05
        },
        service: {
        // interiorDesign: 30,
        architectural: 25,
        // structuralEngineering:50,
        planning:40
    },
        designIdea: "no idea"
    
}
// export const calculateOtherPrices = async (payload) => {


//     // calculating total price
//     const refurbishCost = payload.refurbishSize.quantity * payload.refurbishSize.price * payload.refurbishType.percentage;
//     console.log(refurbishCost, "refurbishCost");
//     const extendCost = payload.extendSize.quantity * payload.extendSize.price * payload.finishLevel.percentage;
//     console.log(extendCost, "extendCost");
//     const bathroomCost =  payload.bathrooms.price;
//     console.log(bathroomCost, "bathroomCost");

//     // const bathroomCost = payload.bathrooms.quantity * payload.bathrooms.price;
//     const windowCost = payload.windowSize.quantity * payload.windowSize.price;
//     console.log(windowCost, "windowCost");

//     const extendRefurbishArea = payload.refurbishSize.quantity + payload.extendSize.quantity;
//     console.log(extendRefurbishArea, "extendRefurbishArea");

//     const interiorDesign = payload.service.interiorDesign * extendRefurbishArea || 0;
//     console.log(interiorDesign, "interiorDesign");

//     const architectural = payload.service.architectural * extendRefurbishArea || 0;
//     console.log(architectural, "architectural");

//     const structuralEngineering = payload.service.structuralEngineering * extendRefurbishArea || 0;
//     console.log(structuralEngineering, "structuralEngineering");

//     const planning = payload.service.planning * extendRefurbishArea || 0;
//     console.log(planning, "planning");

//     const startTimeCost = Number(payload.startTime.percentage);
//     console.log(startTimeCost, "startTimeCost");


//     const total = refurbishCost + extendCost + bathroomCost + windowCost + interiorDesign + architectural + structuralEngineering + planning;
//     const startTimePrice = total * startTimeCost;
//     console.log(total, "total");



//     payload.extendCost = extendCost;
//     payload.refurbishCost = refurbishCost;
//     payload.bathroomsPrice = payload.bathrooms.quantity * payload.bathrooms.price;
//     payload.windowSizePrice = payload.windowSize.quantity * payload.windowSize.price;
//     payload.startTimePrice = startTimePrice;
//     payload.interiorDesign = interiorDesign;
//     payload.architectural = architectural;
//     payload.structuralEngineering = structuralEngineering;
//     payload.planning = planning;
//     payload.total = total + startTimePrice;

//     console.log(total + startTimePrice, "total + startTimePrice");


//     return payload;

// };

// const result = calculateOtherPrices(ob)

// console.log(result, "result");

//
// romise {
//     {
//       property: 'Apartment',
//       propertyPart: 'Living Room',
//       refurbishType: { type: 'full', percentage: 2 },
//       refurbishSize: { quantity: 25, price: 1000 },
//       extendSize: { quantity: 20, price: 2100 },
//       finishLevel: { level: 'low', percentage: 0.7 },
//       bathrooms: { quantity: 1, price: 8000 },
//       windowSize: { quantity: 10, price: 580 },
//       startTime: { startTime: 'asap', percentage: 0.05 },
//       service: {
//         interiorDesign: 30,
//         architectural: 25,
//         structuralEngineering: 50,
//         planning: 40
//       },
//       designIdea: 'no idea',
//       extendCost: 29399.999999999996,
//       refurbishCost: 50000,
//       bathroomsPrice: 8000,
//       windowSizePrice: 5800,
//       startTimePrice: 4986.25,
//       interiorDesign: 1350,
//       architectural: 1125,
//       structuralEngineering: 2250,
//       planning: 1800,
//       total: 104711.25
//     }
//   } result
//
// Promise {
//     {
//       property: 'Apartment',
//       propertyPart: 'Living Room',
//       refurbishType: { type: 'full', percentage: 2 },
//       refurbishSize: { quantity: 25, price: 1000 },
//       extendSize: { quantity: 20, price: 2100 },
//       finishLevel: { level: 'low', percentage: 0.7 },
//       bathrooms: { quantity: 1, price: 8000 },
//       windowSize: { quantity: 10, price: 580 },
//       startTime: { startTime: 'asap', percentage: 0.05 },
//       service: { architectural: 25 },
//       designIdea: 'no idea',
//       extendCost: 29399.999999999996,
//       refurbishCost: 50000,
//       bathroomsPrice: 8000,
//       windowSizePrice: 5800,
//       startTimePrice: 4716.25,
//       interiorDesign: 0,
//       architectural: 1125,
//       structuralEngineering: 0,
//       planning: 0,
//       total: 99041.25
//     }
//   } result
///

////origianal was//////
// export const calculateOtherPrices = async (payload?: any) => {

//     // calculating total price
//     const refurbishCost = payload.refurbishSize.quantity * payload.refurbishSize.price * payload.refurbishType.percentage;
//     const extendCost = payload.extendSize.quantity * payload.extendSize.price * payload.finishLevel.percentage;
//     const bathroomCost = payload.bathrooms.quantity * payload.bathrooms.price;
//     const windowCost = payload.windowSize.quantity * payload.windowSize.price;
//     const extendRefurbishArea = payload.refurbishSize.quantity + payload.extendSize.quantity;
//     const interiorDesign = payload.service.interiorDesign * extendRefurbishArea || 0;
//     const architectural = payload.service.architectural * extendRefurbishArea || 0;
//     const structuralEngineering = payload.service.structuralEngineering * extendRefurbishArea || 0;
//     const planning = payload.service.planning * extendRefurbishArea || 0;
//     const startTimeCost = Number(payload.startTime.percentage);


//     const total = refurbishCost + extendCost + bathroomCost + windowCost + interiorDesign + architectural + structuralEngineering + planning;
//     const startTimePrice = total * startTimeCost;

//     payload.extendCost = extendCost;
//     payload.refurbishCost = refurbishCost;
//     payload.bathroomsPrice = payload.bathrooms.quantity * payload.bathrooms.price;
//     payload.windowSizePrice = payload.windowSize.quantity * payload.windowSize.price;
//     payload.startTimePrice = startTimePrice;
//     payload.interiorDesign = interiorDesign;
//     payload.architectural = architectural;
//     payload.structuralEngineering = structuralEngineering;
//     payload.planning = planning;
//     payload.total = total + startTimePrice;

//     return payload;

// };
///
export const calculateOtherPrices = async (payload) => {
  
    const {refurbishSize, refurbishType, extendSize, finishLevel, bathrooms, windowSize, service, startTime} = payload

    // calculating total price
    const refurbishCost = refurbishSize.quantity * refurbishSize.price * refurbishType.percentage;
    const extendCost = extendSize.quantity * extendSize.price * finishLevel.percentage;
    const bathroomCost =  bathrooms.price;
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

const result = calculateOtherPrices(ob);

console.log(result, "result");