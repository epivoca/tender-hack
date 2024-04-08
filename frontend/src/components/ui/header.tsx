import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import bellIcon from "assets/images/bell.svg";
import zakupkiLogo from "assets/images/logo.svg";
import searchIcon from "assets/images/search.svg";
import userIcon from "assets/images/user.svg";
import { Stack } from "components/stack.components.tsx";
import { Svg } from "components/svg.component.tsx";
import { Text } from "components/text.component.tsx";

export
const Header = observer(() => {
    return (
        <HeaderContainer>
            <Content>
                <HeaderContent>
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                        <Svg src={zakupkiLogo} />
                    </Link>
                    <Stack align={"center"} gap={24}>
                        <Svg src={searchIcon} width={28} height={28} />
                        <Svg src={bellIcon} width={28} height={28} />
                        <UserMenu>
                            <Stack align={"center"} gap={16}>
                                <VerticalDivider />
                                <Stack justify={"center"} gap={24}>
                                    <Stack direction={"column"} justify={"center"}>
                                        <Text weight={600} font-size={14}>Павлов Александр</Text>
                                        <Text size={12} color={"#9B9B9B"}>Поставщик</Text>
                                    </Stack>
                                    <Svg src={userIcon} fill={"#264b82"} width={48} height={48} />
                                </Stack>
                            </Stack>
                        </UserMenu>
                    </Stack>
                </HeaderContent>
            </Content>
        </HeaderContainer>
    );
});

const UserMenu = styled.div`
    display: flex;
    gap: 14px;
    align-items: center;
    cursor: pointer;
`;

const HeaderContainer = styled.header`
    width: 100%;
    height: 76px;
    position: absolute;
    display: flex;
    justify-content: start  ;
    align-items: center;    
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.176) 0px 1px 12px;
    border-bottom: 1px solid #E6E6E6;
`;

export const Content = styled.div`
    max-width: 1355px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
`;

export const HeaderContent = styled.div`
    display: flex;
    margin: auto 0;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

export const VerticalDivider = styled.div`
    width: 1px;
    height: 20px;
    background-color: #9B9B9B;
    opacity: 0.5;
`;
