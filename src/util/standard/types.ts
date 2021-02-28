
export type Flatten<T> = {
    [P in keyof T]: T[P];
};

export type Callable = (...args: any) => any;
