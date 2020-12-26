
import { MAX_BIT_NUMBER } from "../../number/util/constant";
import { isFunction } from "../../util/is/function";
import { isObject } from "../is/object";
import { has } from "../property/has";
import { getKeys } from "../standard/keys";
import { Options, PropertyProfile, Report } from "./deep-explore";

export class DeepState {
    keys: (o: object) => PropertyKey[];
    shouldExplore: (o: unknown) => boolean;
    depthLimit: number;
    existings: Set<object> | Map<object, unknown>;
    path: PropertyKey[] = [];
    route: object[] = [];
    report: Report = {
        maxDepth: 0,
        skip: 0,
        break: 0,
        exit: false,
        hasCyclic: false,
    };
    constructor(public options: Options) {
        const { keys } = options;
        this.keys = isFunction(keys)
            ? keys : getKeys;

        const { shouldExplore } = options;
        this.shouldExplore = isFunction(shouldExplore)
            ? shouldExplore : isObject;

        const depthLimit = options.depthLimit!;
        this.depthLimit = depthLimit < MAX_BIT_NUMBER
            ? depthLimit | 0 : MAX_BIT_NUMBER;

        this.existings = options.useMap ? new Map : new Set;
    }
    depth(): number { return this.route.length; }
    // keys(obj: unknown): void {
    //     if(this._shouldExplore(obj)) {
    //         this._keys(obj);
    //     } else {
    //         // options.all();
    //     }
    // }
    exploreSingle(value: unknown): void {
        const isExplore = this.shouldExplore(value);
        if(!isExplore) return;
        assert.type<Record<PropertyKey, unknown>>(value);

        this.route.push(value);

        const depth = this.depth();
        const isDeepest = depth > this.depthLimit;

        const keys = this.keys(value);
        for(let i = 0;i < keys.length;i++) {
            const key = keys[i];
            if(has(value, key)) continue;

            const useDescriptor = !!this.options.useDescriptor;

            const descriptor = useDescriptor ? Object.getOwnPropertyDescriptor(value, key) : null;
            const child = useDescriptor ? value[key as string] : descriptor!.value;

            this.path.push(key);

            const isAccessor = useDescriptor && descriptor ? !("value" in descriptor) : false;
            const isExisting = this.existings.has(child); // Again
            const isRecursiveReference = isExisting && this.route.includes(child);
            if(isRecursiveReference) this.report.hasCyclic = true;
            const isDive = !(isDeepest || isRecursiveReference || isAccessor);
            // const isExplore = isDive && this.shouldExplore(target);

            const propertyProfile: PropertyProfile = {
                path: this.path,
                route: this.route,
                existings: this.existings,
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
            const didDive = this.options.property!(propertyProfile);
            if(isDive) {
                // if(isExplore) {
                this.exploreSingle(child);
                // } else ;
                if(didDive) didDive();
            }
            this.path.pop();
        }
        this.route.pop();
    }
    // parallel() {}
}
