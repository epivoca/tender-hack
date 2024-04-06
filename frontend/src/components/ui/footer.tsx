import styled from "@emotion/styled";
import React from "react";
import { Text } from "components/text.component.tsx";
import { Content } from "components/ui/header.tsx";

export const Footer = () => {
    return (
        <FooterContainer>
            <Content>
                <FooterContent>
                    <Text size={12} color={"#9B9B9B"}>© 2024 Портал поставщиков</Text>
                </FooterContent>
            </Content>
        </FooterContainer>
    );
};

const FooterContainer = styled.footer`
    width: 100%;
    height: 76px;
    position: relative;
    display: flex;
    justify-content: start  ;
    align-items: center;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: #F6F8FC; 
    border-top: 1px solid #E5E5E5;
`;

const FooterContent = styled.div`
    display: flex;
    margin: auto 0;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;
