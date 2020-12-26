
import { has } from "../property/has";
import { DeepState } from "./state";

export interface PropertyProfile {
    // parent: any;
    descriptor: PropertyDescriptor;
    key: PropertyKey | null; // for root
    value?: unknown;
    // child?: unknown;
    /** ルートからのプロパティーの配列です。 */
    path: PropertyKey[];
    /** ルートからの参照オブジェクトです。 */
    route: object[];
    existings: Set<object> | Map<object, unknown>;

    // value: unknown;
    /** ルートを0とした参照の深さ */
    depth: number;

    isDive: boolean;
    isDeepest: boolean;
    isAccessor: boolean;
    isExisting: boolean;
    /** 再帰参照 */
    isRecursiveReference: boolean;

    // /**
    //  * nullishを渡すとcontinue、その他でそれを探索
    //  * @param value
    //  */
    // dive(value: unknown): void;
}

export interface Options {
    depthLimit?: number;
    useMap?: boolean;
    // report?: boolean;
    // useDescriptor?: boolean;
    // exclude?: PropertyKey[][];
    // methods
    keys?(o: object): PropertyKey[];
    shouldExplore?(o: unknown): boolean;
    // hooks
    // every?(s: InternalState): boolean;
    // every?(s: InternalState, s2: InternalState): boolean;
    property?(profile: PropertyProfile): void | Function;
}

export interface Report {
    maxDepth: number;
    skip: number;
    break: number;
    exit: boolean;
    hasCyclic: boolean;
}

// TODO: Map, Set等の対応。
// IDEA: ユーザーが任意に拡張できるようする?
export const deepExplore = (target: unknown, state: DeepState): void => {
    const isExplore = state.shouldExplore(target);

    // state.invoke("every", { isExplore });

    if(!isExplore) return;

    // if("add" in state.existings)
    //     state.existings.add(target);
    // // else state.existings.set(target, state.ref);
    state.route.push(target);

    const depth = state.depth();
    const isDeepest = depth > state.depthLimit;

    const keys = state.keys(target);
    for(let i = 0;i < keys.length;) {
        const key = keys[i++];
        if(has(target, key)) continue;

        const useDescriptor = !!state.options.useDescriptor;

        const descriptor = useDescriptor ? Object.getOwnPropertyDescriptor(target, key) : null;
        let child = useDescriptor ? target[key] : descriptor!.value;

        state.path.push(key);

        const isAccessor = useDescriptor && descriptor ? !("value" in descriptor) : false;
        const isExisting = state.existings.has(child); // Again
        const isRecursiveReference = isExisting && state.route.includes(child);
        if(isRecursiveReference) state.report.hasCyclic = true;
        let isDive = !(isDeepest || isRecursiveReference || isAccessor);
        // const isExplore = isDive && state.shouldExplore(target);

        const propertyProfile: PropertyProfile = {
            path: state.path,
            route: state.route,
            existings: state.existings,
            ...descriptor,
            descriptor: descriptor!,
            key,
            // value: child,
            depth,
            isDive,
            isDeepest,
            // isExplore,
            isAccessor,
            isExisting,
            isRecursiveReference,
            // dive(value: unknown) {
            //     isDive = value != null;
            //     child = value;
            // }
        };
        const didDive = state.options.property(propertyProfile);
        if(isDive) {
            // if(isExplore) {
            deepExplore(child, state);
            // } else ;
            if(didDive) didDive();
        }
        state.path.pop();
    }
    state.route.pop();
};
