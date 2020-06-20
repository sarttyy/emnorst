
interface State {
    parent: object;
    depth: number;
    innermost: boolean;
}

interface Hooks {
    every?(v: any, p: PropertyKey[]): void | boolean;
    propBefore?(d: PropertyDescriptor, p: PropertyKey[], o: State): void | boolean;
    propAfter?(d: PropertyDescriptor, p: PropertyKey[], o: State): void | boolean;
    existing?(d: PropertyDescriptor, p: PropertyKey[], o: State): void | boolean;
}

interface Methods {
    keys?(o: any): PropertyKey[];
    isExplore?(o: any): boolean;
}

export interface Props {
    depthLimit?: number;
    existing?: Set;
    path?: PropertyKey[];
    hooks?: Hooks;
    methods?: Methods;
    exit?: boolean;
}
