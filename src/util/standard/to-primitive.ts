
import { isFunction } from "../is/function";
import { isPrimitive } from "../is/primitive";
import { assert } from "./assert";
import { Primitive } from "./primitive";

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

    const hint
        = preferredType === "string" ? 1
        : preferredType === "number" ? 0
        : /* preferredType  default */ 2;

    if(isFunction(input[Symbol.toPrimitive])) {
        const result = input[Symbol.toPrimitive]((
            hint === 2 ? "default" : preferredType!
        ));
        if(isPrimitive(result)) return result;
    } else { // OrdinaryToPrimitive
        // if(hint === "default") hint = "number";

        for(let i = 0;i < 2;i++) {
            const fn = (hint & 1) === i ? input.valueOf : input.toString;
            if(isFunction(fn)) {
                const result = fn.call(input);
                if(isPrimitive(result)) return result;
            }
        }
    }
    throw new TypeError("Cannot convert object to primitive value");
};
