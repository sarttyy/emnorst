
interface DeepProfile {
    /** ルートからのプロパティーの配列です。 */
    path: PropertyKey[];
    /** ルートからの参照オブジェクトです。 */
    route: object[];
    existings: ReadonlyMap<object, unknown>;
    /** ルートを0とした参照の深さ */
    depth: number;
}

export interface EveryProfile extends DeepProfile {
    value: unknown;

    isExplore: boolean;
}

export interface PropertyProfile extends DeepProfile {
    parent: object;
    key: PropertyKey | null; // for root
    value: unknown;
    descriptor: PropertyDescriptor;
    // isXXX
    isDive: boolean;
    isDeepest: boolean;
    isAccessor: boolean;
    isExisting: boolean;
    isRecursiveReference: boolean;

    // /**
    //  * nullishを渡すとcontinue、その他でそれを探索
    //  * @param value
    //  */
    // dive(value: unknown): void;
}

export interface Options {
    depthLimit?: number;
    // existings?: Map<object, unknown>;
    // report?: boolean;
    useDescriptor?: boolean;
    // exclude?: PropertyKey[][];
    // methods
    keys?(o: object): PropertyKey[];
    shouldExplore?(o: unknown): boolean;
    // hooks
    every?(value: EveryProfile): unknown;
    property?(profile: PropertyProfile): void | Function;
}

export interface Report {
    maxDepth: number;
    skip: number;
    break: number;
    exit: boolean;
    hasCyclic: boolean;
}
