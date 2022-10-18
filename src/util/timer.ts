export interface TimerOptions<T = unknown> {
    returnValue?: T | PromiseLike<T>;
    signal?: AbortSignal;
}

export const timeout = <T = void>(ms: number, options?: TimerOptions<T>): Promise<T> =>
    new Promise((resolve, reject) => {
        const signal = options?.signal;
        if(signal != null) {
            if(signal.aborted) {
                reject(signal.reason);
                return;
            }
            signal.addEventListener("abort", () => {
                clearTimeout(id);
                reject(signal.reason);
            });
        }
        const id = setTimeout(resolve, ms, options?.returnValue);
    });
