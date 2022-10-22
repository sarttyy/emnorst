export const noop = function(): void {};
export const identify = <T>(value: T): T => value;
export const nonNullable = <T>(value: T): value is NonNullable<T> => value != null;
