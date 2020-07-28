
import { typeOf } from "../../typeof.js";

const regexp = /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/;

export const isTypedArray = (value) => (
    regexp.test(typeOf(value))
);
