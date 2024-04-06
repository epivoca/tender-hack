import { useEffect } from "react";

export const useKeydown = (key: string, event: (e: KeyboardEvent) => void, element?: HTMLElement | null, deps?: unknown[]) => {

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key !== key)
                return void (0);
            if (!element)
                return event(e);

            return element === document.activeElement ? event(e) : void (0);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, deps ?? []);
};
