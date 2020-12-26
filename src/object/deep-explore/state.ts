
import { isFunction } from "../../util/is/function";
import { MAX_BIT_NUMBER } from "../../number/util/constant";
import { isObject } from "../is/object";
import { getKeys } from "../standard/keys";
import { Options, Report } from "./deep-explore";

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
    // single() {}
    // parallel() {}
}
