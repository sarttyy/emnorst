
interface Hooks {
    every?(v: any, p: PropertyKey[]): void;
    propBefore?(p: PropertyDescriptor, p: PropertyKey[], o: any): void;
    propAfter?(p: PropertyDescriptor, p: PropertyKey[], o: any): void;
    existing?(p: PropertyDescriptor, p: PropertyKey[], o: any): void;
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
}
