/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import mongoose from "mongoose";


export function generateRandomPassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// function convertKeysToCamelCase(serviceObject: any) {
//     return Object.keys(serviceObject).reduce((result: any, key) => {
//         const camelCaseKey = key
//             .toLowerCase() // Convert to lowercase
//             .replace(/[^\w\s]/g, '') // Remove special characters like punctuation
//             .split(' ') // Split into words
//             .map((word, index) =>
//                 index === 0
//                     ? word // Keep the first word lowercase
//                     : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize subsequent words
//             )
//             .join(''); // Join back into a single string

//         // Add the new camelCase key with the original value
//         result[camelCaseKey] = serviceObject[key];
//         return result;
//     }, {});
// }

function calculateScaledValues(baseValue: number, data: Record<string, number>): Record<string, number> {
    const scaledValues: Record<string, number> = {};
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        scaledValues[key] = data[key] * baseValue;
      }
    }
  
    return scaledValues;
  }

function calculateTotalValues(data: Record<string, number>): number {
    return Object.values(data).reduce((total, value) => total + value, 0);
}
  
  function convertObjectToArray(data: Record<string, number>): Array<{ name: string; value: number }> {
    return Object.entries(data).map(([key, value]) => ({
      name: key,
      value: value,
    }));
  }


export const calculateOtherPrices = async (payload:any) => {

        const { refurbishSize, refurbishType, extendSize, finishLevel, bathrooms, windowSize, service, startTime } = payload;
        // const service = convertKeysToCamelCase(servicePayload);
      
        const refurbishCost = refurbishSize.quantity * refurbishSize.price * refurbishType.percentage * finishLevel.percentage;
        const extendCost = extendSize.quantity * extendSize.price * finishLevel.percentage;
        const bathroom = bathrooms.price * bathrooms.quantity || 0;
        const bathroomCost = bathroom * finishLevel.percentage;
        const windowCost = windowSize.quantity * windowSize.price;
        const extendArea = extendSize.quantity;
        // const extendRefurbishArea = refurbishSize.quantity + extendSize.quantity;
      
        const services = calculateScaledValues(extendArea, service);
        const startTimeCost = Number(startTime.percentage);
        const serviceTotal = calculateTotalValues(services);
      
        
        const total = refurbishCost + extendCost + bathroomCost + windowCost + serviceTotal;

        const startTimePrice = total * startTimeCost;

        const grandTotal = total + startTimePrice;

        const finalServices = convertObjectToArray(services);
      
        payload.extendCost = extendCost;
        payload.refurbishCost = refurbishCost;
        payload.bathroomsPrice = bathroomCost;
        payload.windowSizePrice = windowCost;
        payload.startTimePrice = startTimePrice;
        payload.services = finalServices;
        payload.total = grandTotal; // Ensure total is explicitly set

    return payload;
};
 
export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}