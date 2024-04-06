
export function debounce<FN extends (...args: any[]) => any>(delay: number, fn: FN) {
    let timerId: NodeJS.Timeout | undefined;

    return ((...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = undefined;
        }, delay);
    }) as FN;
}

export function debounceAsync<FN extends (...args: any[]) => Promise<any> | any>(delay: number, fn: FN) {
    type PromiseResult = FN extends (...args: any[]) => Promise<infer X> ? X : never;

    let timerId: NodeJS.Timeout | undefined;
    let promiseResolve: ((value?: PromiseResult) => void) | undefined;
    let promiseReject: ((reason?: typeof Error) => void) | undefined;

    return ((...args) => {
        if (timerId) {
            clearTimeout(timerId);
            promiseReject?.(Error);
        }
        const promise = new Promise<PromiseResult>((rs, rj) => { // @ts-ignore
            promiseResolve = rs;
            promiseReject = rj;
        });
        timerId = setTimeout(async () => {
            const result = await fn(...args);
            promiseResolve?.(result);
            promiseResolve = undefined;
            promiseReject = undefined;
            timerId = undefined;
        }, delay);

        return promise;
    }) as FN;
}
