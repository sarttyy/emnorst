
declare const opaqueFeature: unique symbol;

interface FeatureMap {
    [name: string]: unknown;
}

export type Opaque<T, U extends FeatureMap> = T & { [opaqueFeature]?: U };
