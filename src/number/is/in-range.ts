
export const inRange = (start: number, value: number, end: number): boolean => (
    start <= value ? value <= end : start >= value && value >= end
);
