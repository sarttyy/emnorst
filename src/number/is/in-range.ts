
export const inRange = (stard: number, value: number, end: number): boolean => (
    stard <= value ? value <= end : stard >= value && value >= end
);
