export const px = (...value: (number | undefined)[]) => value
    .map(x => x === undefined ? "unset" : x)
    .join("px ") + "px";
export const url = (value: string) => `url("${value}")`;

export const hexOpacity = (opacityPercent: number) => {
    if (opacityPercent < 0) {
        return "ff";
    }

    const res = Math.round(opacityPercent * 255 / 100).toString(16);
    if (res.length === 1) {
        return `0${res}`;
    } else if (res.length > 2) {
        return "ff";
    }
    return res;
};
