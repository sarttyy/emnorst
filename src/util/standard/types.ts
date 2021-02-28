
export type Flatten<T> = {
    [P in keyof T]: T[P];
};

export type Callable = (...args: any) => any;

declare const opaqueFeature: unique symbol;

interface FeatureMap {
    [name: string]: unknown;
}

export type Opaque<T, U extends FeatureMap> = T & { [opaqueFeature]?: U };
