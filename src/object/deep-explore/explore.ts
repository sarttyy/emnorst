
import { MAX_BIT_NUMBER } from "../../util/string/constant";
import { isObject } from "../is/object";
import { getKeys } from "../standard/keys";
import { deepExplore, InternalState, Options, Report } from "./deep-explore";

/**
 * 
 * @param target object to explore
 * @param options 
 * @example
 * const report = deepExplore(target);
 */
export const explore = (target: any, options: Options={}): Report => {
    const state: InternalState = {
        keys: typeof options.keys === "function"
            ? options.keys : getKeys,
        shouldExplore: typeof options.shouldExplore === "function"
            ? options.shouldExplore : isObject,
        depthLimit: options.depthLimit < MAX_BIT_NUMBER
            ? options.depthLimit | 0 : Infinity,
        existings: options.useMap ? new Map : new Set,
        path: [],
        route: [],
        report: {
            maxDepth: 0,
            skip: 0,
            break: 0,
            exit: false,
            hasRecursive: false,
        },
        options,
        depth() { return state.route.length; },
        invoke(type, option) {
            if(type in this.options)
                this.options[type](option);
        },
    };
    deepExplore(target, state);
    return state.report;
};
