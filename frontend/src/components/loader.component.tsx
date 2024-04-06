import styled from "@emotion/styled";
import React from "react";
import { Stack } from "components/stack.components.tsx";
import { Text } from "components/text.component.tsx";

const Layout = styled.div<{ $fadeIn?: boolean }>`
  opacity: 1;
  animation: ${p => p.$fadeIn ? "fadein 2s ease" : "unset"};
  margin: auto;
    
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Spinner = styled.span`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: block;
    margin: 15px auto;
    position: relative;
    color: #949494;
    box-sizing: border-box;
    animation: animloader 2s linear infinite;

    @keyframes animloader {
        0% {
            box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px;
        }
        25% {
            box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 2px;
        }
        50% {
            box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px, -38px 0 0 -2px;
        }
        75% {
            box-shadow: 14px 0 0 2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px;
        }
        100% {
            box-shadow: 14px 0 0 -2px, 38px 0 0 2px, -14px 0 0 -2px, -38px 0 0 -2px;
        }
`;

/**
 * Used as min-height container for loader
 */
export const LoaderWrapper = styled.div<{ height?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${p => p.height ?? "300px"};
`;

export const Loader: React.FC<{ fadeIn?: boolean }> = x => {
    return (
        <Layout $fadeIn={x.fadeIn}>
            <Stack align="center" justify="center" direction="column">
                <Spinner />
                <Text size={12} color={"#949494"} weight={500}>Загрузка...</Text>
            </Stack>
        </Layout>
    );
};
