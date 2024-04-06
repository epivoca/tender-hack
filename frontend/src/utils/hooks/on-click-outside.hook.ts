import { RefObject, useEffect, useRef } from "react";

export const useOnClickOutside
    = <T extends HTMLElement>(deps: RefObject<T>[], handler: (event: Event) => void) => {
        const handleClickOutside = (event: Event) => {
            if (deps.every(ref => ref.current && !ref.current.contains(event.target as Node))) {
                handler(event);
            }
        };

        useEffect(() => {
            document.addEventListener("click", handleClickOutside, true);
            document.addEventListener("touchstart", handleClickOutside, true);
            return () => {
                document.removeEventListener("click", handleClickOutside, true);
                document.removeEventListener("touchstart", handleClickOutside, true);
            };
        }, [handler]);
    };
