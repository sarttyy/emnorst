// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeHasOwnProperty = Object.prototype.hasOwnProperty;

export const has = (obj: object, propKey: PropertyKey): boolean =>
    obj != null && nativeHasOwnProperty.call(obj, propKey);
