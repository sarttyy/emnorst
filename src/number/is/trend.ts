
export const uptrend = (...numbers: number[]): boolean => {
    const { length } = numbers;
    let i = 1, prev = numbers[0];
    while(prev <= (prev = numbers[i]) && ++i < length);
    return i === length;
};

export const downtrend = (...numbers: number[]): boolean => {
    const { length } = numbers;
    let i = 1, prev = numbers[0];
    while(prev >= (prev = numbers[i]) && ++i < length);
    return i === length;
};
