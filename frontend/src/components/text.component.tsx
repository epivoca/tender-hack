import styled from "@emotion/styled";
import { Property } from "csstype";

export type TextFontFamily = "Montserrat" | "Radio-Canada" | "Chivo";

interface TextProps {
    fontFamily?: TextFontFamily
    align?: Property.TextAlign
    color?: string
    opacity?: number
    size?: number
    weight?: number
    gradient?: boolean
    spaced?: boolean
    upperCase?: boolean
    underline?: boolean
    preWrap?: boolean
    for?: string
}

export const Text = styled.div<TextProps>`    
    display: inline-block;
    font-family: ${p => p.fontFamily ?? "Montserrat"};
    font-weight: ${p => p.weight ?? "inherit"};
    font-size: ${p => p.size ? `${p.size}px` : "inherit"};
    color: ${p => p.color && !p.gradient ? p.color : (p.gradient ? "transparent" : "inherit")} !important;
    opacity: ${p => p.opacity ?? "inherit"};
    ${p => p.spaced ? "letter-spacing: 0.05em" : ""};
    text-transform: ${p => p.upperCase ? "uppercase" : "none"};
    -webkit-background-clip: ${p => p.gradient ? "text" : "inherit"};
    -moz-background-clip: ${p => p.gradient ? "text" : "inherit"};
    -moz-text-fill-color: ${p => p.gradient ? "transparent" : "inherit"};
    text-align: ${p => p.align ?? "left"};
    position: ${p => p.underline ? "relative" : "static"};
    white-space: ${p => p.preWrap ? "pre-wrap" : "normal"};
    &::after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        bottom: 0;
        display: ${p => p.underline ? "block" : "none"}
    };
`;
