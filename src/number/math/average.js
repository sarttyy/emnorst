
import { sum } from "./sum.js";

/**
 * 平均値
 * @param  {number[]} numbers
 * @return {number}
 */
export const average = (numbers) => sum(numbers) / numbers.length;
