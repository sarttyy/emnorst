/**
 * Same as `Array.isArray`, but does not use `any` in the type definition.
 *
 * @example
 * ```
 * if(Array.isArray(foo)) {
 *   foo // any[]
 * }
 *
 * import { isArray } from "emnorst";
 * if(isArray(foo)) {
 *   foo // readonly unknown[]
 * }
 * ```
 */
export const isArray: (value: unknown) => value is readonly unknown[] = Array.isArray;
