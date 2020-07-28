
import { isPositive } from "./positive.js";

export const isMersenne = (number) => (
    isPositive(number) && !~number.toString(2).indexOf("0")
);
