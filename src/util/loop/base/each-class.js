
// @ts-check

import { has } from "../../../object/property/has.js";
import { getKeys } from "../../../object/property/keys.js";
import { isArrayLike } from "../../is/object/array-like.js";
import { isIterable } from "../../is/other/iterable.js";
import { isNullLike } from "../../is/other/null-like.js";
import { iterate } from "../iterate/iterate.js";
import { nexts } from "./each-nexts.js";

/**
 * @example
 * for(const each = new Each();each.continue();) {
 *     const { value, count } = each.current;
 * }
 */
export class Each {
    /**
     * @param {any} eachItems
     * @param {{
        mode?: "object" | "arraylike" | "iterable";
        keys?(arg0: object): PropertyKey[];
        reverse?: boolean;
    }} props
     */
    constructor(eachItems, props={}) {
        if(isNullLike(eachItems))
            throw new Error("eachItems is not eachable");
        this.mode = has(nexts, props.mode) ? props.mode
            : isArrayLike(eachItems) ? "arraylike"
            : isIterable(eachItems) ? "iterable"
            : "object";
        switch(this.mode) {
        case "object":
            this.keys = (props.keys || getKeys)(eachItems);
            break;
        case "arraylike":
            this.reverse = !!props.reverse;
            break;
        case "iterable":
            this.iterator = iterate(eachItems);
            break;
        }
        this.eachItems = eachItems;
        this.done = false;
        this.current = {
            count: this.reverse ? eachItems.length : -1
        };
    }
    continue() {
        if(this.done) return false;
        nexts[this.mode](this);
        return !this.done;
    }
}
