
// @ts-check

import { getKeys } from "../../../object/property/keys.js";
import { isNullLike } from "../../is/other/null-like.js";
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
        if(isNullLike(eachItems))
            throw new Error("eachItems is not eachable");
        this.mode = modeAnalysis(eachItems, props.mode);
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
