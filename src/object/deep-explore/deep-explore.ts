
// import { has } from "../property/has";

interface PropertyProfile {
    // parent: any;
    descriptor: PropertyDescriptor;
    depth: number;
    deepest: boolean;
    existings: Set<any> | Map<any, any>;
    path: PropertyKey[];
    route: any[];
}
export interface Options {
    depthLimit?: number;
    useMap?: boolean;
    report?: boolean;
    // exclude?: PropertyKey[][];
    // methods
    keys?(o: any): PropertyKey[];
    shouldExplore?(o: any): boolean;
    // hooks
    every?(s: InternalState): void,
    recursive?(s: InternalState): void,
    propertyWillDive?(s: PropertyProfile): void,
    property?(s: InternalState): void,
    propertyDidDive?(s: PropertyProfile): void,
}
export interface InternalState {
    // methods
    keys(o: any): PropertyKey[];
    shouldExplore(o: any): boolean;
    invoke(t: string, o?: any): void;
    // constants
    depthLimit: number;
    options: Options;
    // state
    existings: Set<any> | Map<any, any>;
    path: PropertyKey[];
    route: any[];
    report: Report;
    depth(): number;
}
export interface Report {
    maxDepth: number;
    skip: number;
    break: number;
    exit: boolean;
    hasRecursive: boolean;
}

// TODO: Map, Set等の対応。
// IDEA: ユーザーが任意に拡張できるようする?
export const deepExplore = (target: any, state: InternalState): void => {
    const isExplore = state.shouldExplore(target);

    state.invoke("every", { isExplore });

    if(!isExplore) return;

    if("add" in state.existings)
        state.existings.add(target);
    // else state.existings.set(target, state.ref);
    state.route.push(target);

    const depth = state.depth();
    const deepest = depth > state.depthLimit;

    const keys = state.keys(target);
    for(let i = 0;i < keys.length;) {
        const key = keys[i++];
        const descriptor = Object.getOwnPropertyDescriptor(target, key);

        state.path.push(key);

        const isValue = descriptor && "value" in descriptor;
        const existingProperty = state.existings.has(descriptor.value);
        if(existingProperty) {
            const recursiveReference = state.route.includes(descriptor.value);

            state.invoke("propertyAgain", { ...state, path: [...state.path], descriptor });
            type propertyAgain = (obj: unknown) => asserts obj is Object;
            const propertyAgain = ({}) => ({});
            if(typeof propertyAgain === "function") {
                propertyAgain({ state, descriptor, depth, deepest });
            }

            if(recursiveReference) {
                state.report.hasRecursive = true;
                state.invoke("recursive", { ...state, path: [...state.path], descriptor });
            }
        } else {
            state.invoke("property", { ...state, path: [...state.path], descriptor });
            // invokeHook("property", props, propDesc);
            // && state.isDive()
            if(!deepest && isValue) {
                // invokeHook("propertyWillDive", props, propDesc);
                state.invoke("propertyWillDive");
                deepExplore(descriptor.value, state);
                // invokeHook("propertyDidDive", props, propDesc);
                state.invoke("propertyDidDive");
            }
        }
        state.path.pop();
    }
    state.route.pop();
};
