import React, { HTMLProps } from "react";
import { px } from "../utils/css.ts";

export interface SvgProps extends Pick<HTMLProps<SVGElement>, "style" | "className" | "title" | "disabled"> {
    src: string
    height?: number | string
    width?: number
    fill?: string
    color?: string
    spin?: boolean
}

const SvgComponent: React.FC<SvgProps> = ({ src: string, ...x }) => {
    const width = x.width ? px(x.width) : "fit-content";
    const height = typeof x.height === "number" ? px(x.height) : x.height ?? "inherit";
    return (
        <img {...x}
             src={string}
             style={{
                 display: "flex",
                 color: x.color ?? "none",
                 fill: x.fill ?? "none",
                 minWidth: width,
                 minHeight: height,
                 width,
                 height,
                 pointerEvents: x.disabled ? "none" : undefined,
                 opacity: x.disabled ? 0.5 : undefined,
                 ...x.style
             }} />
    );
};

/**
 * Обернул Svg в див без стилей из-за того, что title у svg работает не по площади svg, а лишь там где есть сама картинка
 * @param x
 * @constructor
 */
export const SvgBase: React.FC<SvgProps> = x => {
    return (
        <SvgComponent {...x} title={undefined} />
    );

};

export const Svg = Object.assign(SvgBase, {
});
