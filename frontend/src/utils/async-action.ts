/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, runInAction } from "mobx";

export class AsyncAction<Fn extends (...args: any) => Promise<unknown>> {
    constructor(private fn: Fn) {
        makeAutoObservable(this, undefined, { autoBind: true });
    }

    private _promise: ReturnType<Fn> | null = null;

    private _lastError: unknown = null;

    private _lastResult: Awaited<ReturnType<Fn>> | null = null;

    get error(): any { return this._lastError; }
    get pending(): boolean { return !!this._promise; }
    get result(): any { return this._lastResult; }
    get promise(): ReturnType<Fn> | null { return this._promise; }

    private setPromise = (promise: ReturnType<Fn> | null) => {
        runInAction(() => {
            this._promise = promise;
        });
    };

    private setResult = (result: Awaited<ReturnType<Fn>> | null, error: unknown) => {
        runInAction(() => {
            this._lastResult = result;
            this._lastError = error;
        });
    };

    tryRun(...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> | null {
        if (this._promise)
            return null;

        return this.run(...args);
    }

    run(...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> {
        if (this._promise)
            throw new Error("Action is already running");

        return this._run(...args);
    }

    /** idk */
    forceRun(...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> {
        return this._run(...args);
    }

    private async _run(...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> {
        try {
            this.setPromise(this.fn(...[...args]) as Awaited<ReturnType<Fn>>);

            const result = await this._promise!;
            this.setResult(result, null);
            this.setPromise(null);

            return result;
        } catch (e) {
            this.setResult(null, e);
            this.setPromise(null);
            throw e;
        }
    }
}
