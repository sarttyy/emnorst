/**
 * The largest number that can be represented by signed int 32.
 * The value of MAX_INT32 is equal to `2**31-1`.
 */
export const MAX_INT32 = 0x7fffffff;

/**
 * The smallest number that can be represented by signed int 32.
 * The value of MIN_INT32 is equal to `-(2**31)`.
 */
export const MIN_INT32 = -0x80000000;

/**
 * Returns true if the value passed is a signed int 32.
 */
export const isInt32 = (n: unknown): boolean => n === (n as number >> 0);

/**
 * The largest number that can be represented by unsigned int 32.
 * The value of MAX_UINT32 is equal to `2**32-1`.
 */
export const MAX_UINT32 = 0xffffffff;

/**
 * Returns true if the value passed is an unsigned int 32.
 */
export const isUint32 = (n: unknown): boolean => n === (n as number >>> 0);
