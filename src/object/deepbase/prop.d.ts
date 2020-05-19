
interface Hooks {
    property?: function(PropertyDescriptor): void;
    accessor?: function(PropertyDescriptor): void;
    every?: function(any, number): void;
}

interface Methods {
    keys?: function(any): PropertyKey[];
    isObject?: function(any): boolean;
}

export interface Props {
    depth?: number;
    depthLimit?: number;
    existing?: Set;
    hooks?: Hooks;
    methods?: Methods;
}
