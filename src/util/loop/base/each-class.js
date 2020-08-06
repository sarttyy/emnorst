
// @ts-check

import { getKeys } from "../../../object/property/keys.js";
import { isFunction } from "../../is/other/function.js";
import { iterate } from "../iterate/iterate.js";
import { nexts } from "./each-nexts.js";
import { modeAnalysis } from "./mode-analysis.js";

/** @typedef {"object" | "arraylike" | "iterable" | "auto"} mode */

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
        mode?: mode | (mode)[];
        keys?(arg0: object): PropertyKey[];
        reverse?: boolean;
    }} props
     */
    constructor(eachItems, props={}) {
        if(eachItems == null)
            throw new Error("eachItems is not eachable");
        const mode = this.mode = modeAnalysis(eachItems, props.mode);
        switch(mode) {
        case "object":
            this.keys = isFunction(props.keys)
                ? (props.keys || getKeys)(eachItems)
                : props.keys;
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
