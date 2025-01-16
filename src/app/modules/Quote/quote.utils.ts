/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */


export function generateRandomPassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function convertKeysToCamelCase(serviceObject: any) {
    return Object.keys(serviceObject).reduce((result: any, key) => {
        const camelCaseKey = key
            .toLowerCase() // Convert to lowercase
            .replace(/[^\w\s]/g, '') // Remove special characters like punctuation
            .split(' ') // Split into words
            .map((word, index) =>
                index === 0
                    ? word // Keep the first word lowercase
                    : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize subsequent words
            )
            .join(''); // Join back into a single string

        // Add the new camelCase key with the original value
        result[camelCaseKey] = serviceObject[key];
        return result;
    }, {});
}


export const calculateOtherPrices = async (payload:any) => {
  
    const {refurbishSize, refurbishType, extendSize, finishLevel, bathrooms, windowSize, service:servicePayload, startTime} = payload
     const service = convertKeysToCamelCase(servicePayload)

    // calculating total price
    const refurbishCost = refurbishSize.quantity * refurbishSize.price * refurbishType.percentage * finishLevel.percentage;
    const extendCost = extendSize.quantity * extendSize.price * finishLevel.percentage;
    const bathroomCost =  bathrooms.price * bathrooms.quantity || 0;
    const windowCost = windowSize.quantity * windowSize.price;
    const extendRefurbishArea = refurbishSize.quantity + extendSize.quantity;
    const interiorDesign = service.interiorDesign * extendRefurbishArea || 0;
    const architectural = service.architectural * extendRefurbishArea || 0;
    const structuralEngineering = service.structuralEngineering * extendRefurbishArea || 0;
    const planning = service.planning * extendRefurbishArea || 0;
    const projectManagement = service.projectManagement * extendRefurbishArea || 0;
    const startTimeCost = Number(startTime.percentage);
    const total = refurbishCost + extendCost + bathroomCost + windowCost + interiorDesign + architectural + structuralEngineering + planning + projectManagement;
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