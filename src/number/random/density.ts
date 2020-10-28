
import { isInfinity } from "../is/infinity";

/**
 * 0 <= value < max
 * @param value
 * @param toRange
 * @param fromRange
 */
export const density = (value: number, toRange: number, fromRange=1): number => {
    if(isInfinity(toRange)) return value;
    if(isInfinity(fromRange)) return value % toRange;
    return toRange / fromRange * value % toRange;
};

// const density = (value, toRange, fromRange=1) => value / fromRange * toRange % toRange
