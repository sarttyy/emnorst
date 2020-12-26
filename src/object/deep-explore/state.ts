
import { MAX_BIT_NUMBER } from "../../number/util/constant";
import { isFunction } from "../../util/is/function";
import { isObject } from "../is/object";
import { has } from "../property/has";
import { getKeys } from "../standard/keys";
import { Options, PropertyProfile, Report } from "./deep-explore";

export class DeepState {
    private _keys: (o: object) => PropertyKey[];
    private _shouldExplore: (o: unknown) => boolean;
    private _depthLimit: number;
    private _existings: Set<object> | Map<object, unknown>;
    private _path: PropertyKey[] = [];
    private _route: object[] = [];
    report: Report = {
        maxDepth: 0,
        skip: 0,
        break: 0,
        exit: false,
        hasCyclic: false,
    };
    constructor(public options: Options) {
        const { keys } = options;
        this._keys = isFunction(keys)
            ? keys : getKeys;

        const { shouldExplore } = options;
        this._shouldExplore = isFunction(shouldExplore)
            ? shouldExplore : isObject;

        const depthLimit = options.depthLimit!;
        this._depthLimit = depthLimit < MAX_BIT_NUMBER
            ? depthLimit | 0 : MAX_BIT_NUMBER;

        this._existings = options.useMap ? new Map : new Set;
    }
    private _depth(): number { return this._route.length; }
    // keys(obj: unknown): void {
    //     if(this._shouldExplore(obj)) {
    //         this._keys(obj);
    //     } else {
    //         // options.all();
    //     }
    // }
    // TODO: Map, Set等の対応。
    // IDEA: ユーザーが任意に拡張できるようする?
    exploreSingle(value: unknown): void {
        const isExplore = this._shouldExplore(value);

        const ref = this.options.every!();

        if(!isExplore) return;
        assert.type<Record<PropertyKey, unknown>>(value);

        if(this.options.useMap) {
            assert.type<Map<object, unknown>>(this._existings);
            this._existings.set(value, ref);
        } else {
            assert.type<Set<object>>(this._existings);
            this._existings.add(value);
        }

        this._route.push(value);

        const keys = this._keys(value);
        for(let i = 0;i < keys.length;i++) {
            const key = keys[i];
            if(has(value, key)) continue;
            this._path.push(key);

            const propertyProfile = this.getPropertyProfile(value, key);
            if(propertyProfile.isRecursiveReference) {
                this.report.hasCyclic = true;
            }

            const didDive = this.options.property!(propertyProfile);
            if(propertyProfile.isDive) {
                // if(isExplore) {
                this.exploreSingle(propertyProfile.value);
                // } else ;
                if(didDive) didDive();
            }
            this._path.pop();
        }
        this._route.pop();
    }
    getPropertyProfile(parent: Record<PropertyKey, unknown>, key: PropertyKey): PropertyProfile {
        const depth = this._depth();
        const isDeepest = depth > this._depthLimit;
        const useDescriptor = !!this.options.useDescriptor;

        const descriptor = useDescriptor ? Object.getOwnPropertyDescriptor(parent, key) : null;
        const child = useDescriptor ? parent[key as string] : descriptor!.value;

        const isAccessor = useDescriptor && descriptor ? !("value" in descriptor) : false;
        const isExisting = this._existings.has(child); // Again
        const isRecursiveReference = isExisting && this._route.includes(child);
        const isDive = !(isDeepest || isRecursiveReference || isAccessor);
        // const isExplore = isDive && this.shouldExplore(target);

        return {
            path: this._path,
            route: this._route,
            existings: this._existings,
            descriptor: descriptor!,
            key,
            value: child,
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
    }
    // parallel() {}
}
