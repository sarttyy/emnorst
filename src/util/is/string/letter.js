
import { isBetween } from "../number/between.js";

export const isLowerChar = (char) => (
    isBetween(char, "a", "z")
    || isBetween(char, "ａ", "ｚ")
);

export const isUpperChar = (char) => (
    isBetween(char, "A", "Z")
    || isBetween(char, "Ａ", "Ｚ")
);
