export const clamp = (x: number, lower: number, upper: number): number =>
    Math.min(Math.max(x, lower), upper);

/**
 * Performs modulo operations,
 * but unlike the `%` operator,
 * always returns a positive number.
 *
 * @example
 * modulo(-12, 10) === 8
 */
export const modulo = (x: number, mod: number): number => (
    (x %= mod) < 0
        ? x + (mod < 0 ? -mod : mod) // Math.abs
        : x + 0 // -0 + +0 === +0
);
