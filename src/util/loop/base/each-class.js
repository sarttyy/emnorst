
import { getKeys } from "../../../object/standard/keys.js";
import { isArrayLike } from "../../is/object/array-like.js";
import { isArray } from "../../is/object/array.js";
import { isObject } from "../../is/object/object.js";
import { isIterable } from "../../is/other/iterable.js";
import { iterate } from "../iterate/iterate.js";
import { nexts } from "./each-nexts.js";

/** @typedef {"object" | "arraylike" | "iterable" | "auto"} mode */

const ARRAYLIKE = "arraylike";
const ITERABLE = "iterable";
const OBJECT = "object";

/**
 * @template T
 * @example
 * for(const each = new Each();each.continue();) {
 *     const { value, count } = each.current;
 * }
 */
export class Each {
    /**
     * @param {any} eachItems
     * @param {{
        mode?: mode | mode[];
        keys?(arg0: object): PropertyKey[];
        reverse?: boolean;
    }} props
     */
    constructor(eachItems, props={}) {
        if(eachItems == null)
            throw new Error("eachItems is not eachable");
        this.eachItems = eachItems;
        this.done = false;
        const reverse = !!props.reverse;
        /**
         * @type {object}
         * @property {T} value
         */
        this.current = {
            count: reverse ? eachItems.length : -1
        };
        const keys = props.keys || props;
        let mode = props.mode || props;
        if(!(mode in nexts)) {
            mode = isArrayLike(eachItems) ? ARRAYLIKE
                : isIterable(eachItems) ? ITERABLE
                : OBJECT;
        }
        this.mode = mode;
        switch(mode) {
        case ARRAYLIKE:
            this.reverse = reverse;
            break;
        case ITERABLE:
            this.iterator = iterate(eachItems);
            break;
        case OBJECT:
            this.keys = isArray(keys) ? keys
                : (typeof keys === "function" ? keys : getKeys)(eachItems);
            break;
        }
    }
    continue() {
        if(this.done) return false;
        nexts[this.mode](this);
        return !this.done;
    }
    static modeAnalysis(eachItems, mode) {
        if(mode in nexts) return mode;
        if(!isArray(mode))
            mode = [ARRAYLIKE, ITERABLE, OBJECT];

        for(let i = 0;i < mode.length;)
            switch(mode[i++]) {
            case ARRAYLIKE:
                if(isArrayLike(eachItems))
                    return ARRAYLIKE;
                break;
            case ITERABLE:
                if(isIterable(eachItems))
                    return ITERABLE;
                break;
            case OBJECT:
                if(isObject(eachItems))
                    return OBJECT;
                break;
            }
        return null;
    }
}
