
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
