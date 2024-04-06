import { useEffect, useRef } from "react";

export const useCollapsible = (isOpen: boolean) => {
    const ref = useRef<HTMLDivElement>(null);

    const toggleHeight = () => {
        if (ref.current) {
            ref.current.style.maxHeight = isOpen
                ? ref.current.scrollHeight + "px"
                : "0px";
            ref.current.style.opacity = isOpen ? "1" : "0";
        }
    };

    useEffect(toggleHeight, [isOpen]);

    useEffect(() => {
        const observer = new MutationObserver(toggleHeight);

        if (ref.current) {
            ref.current?.addEventListener("transitionstart", toggleHeight);
            observer.observe(ref.current, { childList: true, subtree: true, attributes: true, characterData: true });
        }

        return () => {
            ref.current?.removeEventListener("transitionstart", toggleHeight);
            observer.disconnect();
        };
    }, [isOpen]);

    useEffect(() => {
        window.addEventListener("resize", toggleHeight);

        return () => window.removeEventListener("resize", toggleHeight);
    });

    return ref;
};
