
type PositiveInfinity = 999e999;
type NegativeInfinity = -999e999;

export const isInfinity = (number: any): number is PositiveInfinity | NegativeInfinity => (
    number === Infinity || number === -Infinity
);
