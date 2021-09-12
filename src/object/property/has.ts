// eslint-disable-next-line @typescript-eslint/unbound-method
const objectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty;

export const has = (obj: object, propKey: PropertyKey): boolean =>
    obj != null && objectPrototypeHasOwnProperty.call(obj, propKey);
