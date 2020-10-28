
import { uptrend } from "../../../number/is/trend";

export const isLowerChar = (char) => (
    uptrend("a", char, "z")
    || uptrend("ａ", char, "ｚ")
);

export const isUpperChar = (char) => (
    uptrend("A", char, "Z")
    || uptrend("Ａ", char, "Ｚ")
);
