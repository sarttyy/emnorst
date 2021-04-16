
export type Callable = (...args: any) => any;

declare const meta: unique symbol;
interface HasMeta<T> { [meta]?: T }

export type Meta<T, U> = T & HasMeta<U>;
