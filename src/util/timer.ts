export interface TimerOptions {
    signal?: AbortSignal;
}

export const timeout = (ms: number, options?: TimerOptions): Promise<void> =>
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
        const id = setTimeout(resolve, ms);
    });
