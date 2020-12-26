
import { Options, Report } from "./deep-explore";
import { DeepState } from "./state";

/**
 *
 * @param target object to explore
 * @param options
 * @example
 * const report = deepExplore(target);
 */
export const explore = (target: unknown, options: Options={}): Report => {
    const state = new DeepState(options);
    state.exploreSingle(target);
    return state.report;
};
