
import { isFunction } from "../../util/is/function";
import { MAX_BIT_NUMBER } from "../../number/util/constant";
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
export const explore = (target: unknown, options: Options={}): Report => {
    const state: InternalState = {
        keys: isFunction(options.keys)
            ? options.keys : getKeys,
        shouldExplore: isFunction(options.shouldExplore)
            ? options.shouldExplore : isObject,
        depthLimit: (options.depthLimit as number) < MAX_BIT_NUMBER
            ? (options.depthLimit as number) | 0 : Infinity,
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
