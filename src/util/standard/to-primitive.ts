
import { isFunction } from "../is/function";
import { isPrimitive } from "../is/primitive";

type Hint = "string" | "number" | "default";

/**
 * Implementation of ToPrimitive.
 *
 * @param input
 * @param preferredType
 * @see https://www.ecma-international.org/ecma-262/8.0/index.html#sec-toprimitive
 */
export const toPrimitive = (input: unknown, preferredType?: Hint): Primitive => {
    if(isPrimitive(input)) return input;
    assert.type<{ [Symbol.toPrimitive](hint: Hint): Primitive }>(input);

    const hint: Hint = preferredType !== "string" && preferredType !== "number"
        ? "default" : preferredType;

    if(isFunction(input[Symbol.toPrimitive])) {
        const result = input[Symbol.toPrimitive](hint);
        if(isPrimitive(result)) return result;
    } else { // OrdinaryToPrimitive
        // if(hint === "default") hint = "number";

        for(let i = 0;i < 2;i++) {
            const fn = (hint === "string" ? 0 : 1) === i ? input.toString : input.valueOf;
            if(isFunction(fn)) {
                const result = fn.call(input);
                if(isPrimitive(result)) return result;
            }
        }
    }
    throw new TypeError("Cannot convert object to primitive value");
};
