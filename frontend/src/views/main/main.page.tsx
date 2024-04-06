import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SkuDto } from "api/models/sku.model.ts";
import { Stack } from "components/stack.components.tsx";
import { Text } from "components/text.component.tsx";
import { PrimaryButton } from "components/ui/button.tsx";
import { Content } from "components/ui/header.tsx";
import { useCollapsible } from "utils/hooks/use-collapsible.ts";
import { MainPageViewModel } from "views/main/main.vm.ts";
import SkuItem = SkuDto.Item;

// _id: string;     image: string;     product_type: string;     name: string;     model: string;     manufacturer: string;     measurement_unit: string;     country_of_origin: string;     characteristics: {         name: string;         value: string;         unit: string;     }[];     gost_classification?: string | undefined;

export const MainPage = observer(() => {
    const navigate = useNavigate();
    const [vm] = React.useState(() => new MainPageViewModel());
    return (
        <MainContainer>
            <Content>
                <MainContent>
                    <Stack align={"center"} justify={"space-between"} gap={24} wFull>
                        <Text size={24} weight={700}>Каталог товаров</Text>
                        <PrimaryButton onClick={() => navigate("/sku-change-request/new")}>
                            Добавить СТЕ</PrimaryButton>
                    </Stack>
                    <SteGrid>
                        { vm.skuList.map(x => (
                            <SteItemCard key={x._id} {...x} />
                        )) }
                    </SteGrid>
                    {
                        vm.skuList.length === 0 && (
                            <Stack align={"center"} justify={"center"} gap={24} wFull hFull style={{ marginTop: "100px" }}>
                                <Text opacity={0.4} size={16} weight={500}>СТЕ отсутствуют! Станьте первым!</Text>
                            </Stack>
                        )
                    }
                </MainContent>
            </Content>
        </MainContainer>
    );
});

const MainContainer = styled.div`
    padding-top: 32px;
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: start ;
    background: #fff;
    align-items: start;
    left: 0;
    flex: auto;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    align-items: start;
    margin: auto 0;
    height: 100%;
`;

const SteItemCard = observer((x: SkuItem) => {
    const [isAdditionsOpen, setIsAdditionsOpen] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const ref = useCollapsible(isAdditionsOpen);
    const onClick = () => {
        // navigate("/sku/view/1");
    };

    return (
        <SteItemCardContainer onClick={onClick}>
            <Stack direction={"column"} gap={8}>
                <SteItemCardImage src={x.image} alt={x.name} />
                <Text size={16} weight={600}>{ x.name }</Text>
                <Stack direction={"row"} gap={4} $wrap={"wrap"}>
                    <Text size={14} color={"#7e7e7e"} weight={500}>Модель:</Text>
                    <Text size={14} color={"#9B9B9B"}>{ x.model }</Text>
                </Stack>
                <Stack direction={"row"} gap={4} $wrap={"wrap"}>
                    <Text size={14} color={"#7e7e7e"} weight={500}>Производитель:</Text>
                    <Text size={14} color={"#9B9B9B"}>{ x.manufacturer }</Text>
                </Stack>
                { x.characteristics.slice(0, 5).map((c, i) => (
                    <Stack key={i} direction={"row"} gap={4} $wrap={"wrap"}>
                        <Text size={14} weight={500} color={"#7e7e7e"}>{ c.name }:</Text>
                        <Text size={14} color={"#9B9B9B"}>{ c.value }</Text>
                    </Stack>
                )) }
                <ContentWrapper ref={ref}>
                    { x.characteristics.slice(5).map((c, i) => (
                        <Stack key={i} direction={"row"} gap={4} $wrap={"wrap"}>
                            <Text size={14} weight={500} color={"#7e7e7e"}>{ c.name }:</Text>
                            <Text size={14} color={"#9B9B9B"}>{ c.value }</Text>
                        </Stack>
                    )) }
                </ContentWrapper>
                {
                    x.characteristics.length > 5 && (
                        <Text onClick={() => setIsAdditionsOpen(!isAdditionsOpen)}
                              size={14}
                              weight={500}
                              color={"#000"}
                              style={{ cursor: "pointer" }}>
                            { isAdditionsOpen ? "Скрыть ↑" : "Показать все характеристики ↓" }
                        </Text>
                    )
                }

            </Stack>
        </SteItemCardContainer>
    );
});

const ContentWrapper = styled.div`
    transition: all 0.15s ease-in-out;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 30px;
`;

const SteGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    width: 100%;
    height: 100%;
`;

const SteItemCardContainer = styled.div`
    display: flex;
    gap: 24px;
    padding: 30px;
    border: 1px solid #E6E6E6;
    border-radius: 1px;
    cursor: pointer;
`;

const SteItemCardImage = styled.img`
    width: 250px;
    height: 250px;
    justify-self: center;
    object-fit: cover;
    margin-bottom: 16px;
`;

