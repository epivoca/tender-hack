import styled from "@emotion/styled";
import { Property } from "csstype";

interface StackProps {
    direction?: Property.FlexDirection
    gap?: number
    align?: Property.AlignItems
    justify?: Property.JustifyContent
    inlineFlex?: boolean
    flex?: Property.Flex
    $wrap?: Property.FlexWrap | boolean
    hFull?: boolean
    wFull?: boolean
}

export const Stack = styled.div<StackProps>`
    display: ${p => p.inlineFlex ? "inline-flex" : "flex"};
    flex-direction: ${p => p.direction ?? "row"};
    gap: ${p => `${p.gap ?? 0}px`};
    align-items: ${p => p.align ?? "stretch"};
    justify-content: ${p => p.justify ?? "stretch"};
    flex: ${p => p.flex ?? "0 1 auto"};
    flex-wrap: ${p => p.$wrap === true ? "wrap" : p.$wrap ?? "nowrap"};
    height: ${p => p.hFull ? "100%" : "auto"};
    width: ${p => p.wFull ? "100%" : "auto"};
`;
