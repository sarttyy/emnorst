
/**
 * IDEA: rename isNullish
 */
// eslint-disable-next-line no-eq-null
export const isNullLike = (value) => value == null;

export const isNull = (value) => value === null;

export const isUndefined = (value) => value === void 0;

export const isDefined = (value) => value !== void 0;
