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
import SkuItem = SkuDto.SkuItem;

// _id: string;     image: string;     product_type: string;     name: string;     model: string;     manufacturer: string;     measurement_unit: string;     country_of_origin: string;     characteristics: {         name: string;         value: string;         unit: string;     }[];     gost_classification?: string | undefined;
const mockSkuItems: SkuItem[] = [
    {
        _id: "1",
        image: "https://zakupki.mos.ru/newapi/api/Core/Thumbnail/208202039/250/250",
        product_type: "product_type",
        name: "Блокнот МАЛЫЙ ФОРМАТ А6 108х145 мм, 40 л., гребень, картон, клетка, BRAUBERG, \"Милые котята\", 114391",
        model: "Блокнот МАЛЫЙ ФОРМАТ А6 108х145 мм, 40 л., гребень, картон, клетка, BRAUBERG, \"Милые котята\", 114391",
        manufacturer: "Brauberg",
        measurement_unit: "measurement_unit",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "Внутренний блок",
                value: "офсет",
                unit: "",
            },
            {
                name: "Количество листов",
                value: "40",
                unit: "",
            },
            {
                name: "Линовка блока",
                value: "клетка",
                unit: "",
            },
            {
                name: "Лицензионная обложка",
                value: "нет",
                unit: "",
            },
            {
                name: "Наличие разделителей",
                value: "нет",
                unit: "",
            },
            {
                name: "Плотность внутреннего блока",
                value: "60 гр/м2",
                unit: "",
            },
            {
                name: "Расположение переплета",
                value: "верхнее",
                unit: "",
            },
            {
                name: "Серия",
                value: "мелованный картон",
                unit: "",
            },
            {
                name: "Скрепление блока",
                value: "гребень (евроспираль)",
                unit: "",
            },
        ],
    },
    {
        _id: "2",
        image: "https://zakupki.mos.ru/newapi/api/Core/Thumbnail/208202042/300/300",
        product_type: "product_type",
        name: "name",
        model: "model",
        manufacturer: "manufacturer",
        measurement_unit: "measurement_unit",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "name",
                value: "value",
                unit: "unit",
            },
        ],
    },
    {
        _id: "3",
        image: "https://zakupki.mos.ru/newapi/api/Core/Thumbnail/2101579239/300/300",
        product_type: "product_type",
        name: "Шпатлевка цементная Старатели \"Фасадно-финишная\" ГОСТ 33699 белая 20кг",
        model: "Фасадно-финишная",
        manufacturer: "Старатели",
        measurement_unit: "штука",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "Готовность к последующей обработке через",
                value: "24 ч",
                unit: "",
            },
            {
                name: "Жизнеспособность готового раствора",
                value: "3 ч",
                unit: "",
            },
            {
                name: "Максимальная толщина слоя",
                value: "3 мм",
                unit: "",
            },
            {
                name: "Максимальный размер фракции",
                value: "0.2 мм",
                unit: "",
            },
            {
                name: "Минимальная толщина слоя",
                value: "0.3 мм",
                unit: "",
            },
            {
                name: "Морозостойкость",
                value: "25 циклы",
                unit: "",
            },
            {
                name: "Прочность сцепления с основанием",
                value: "1 МПа",
                unit: "",
            },
            {
                name: "Расход смеси (слой 1 мм)",
                value: "1 килограмм на квадратный метр (кг/м2)",
                unit: "",
            },
            {
                name: "Срок годности",
                value: "12 мес",
                unit: "",
            },
            {
                name: "Температура применения",
                value: "+10, +30 [0*]С",
                unit: "",
            },
            {
                name: "Тип использования",
                value: "внутренняя",
                unit: "",
            },
        ],
    },
    {
        _id: "4",
        image: "https://example.com/image.jpg",
        product_type: "product_type",
        name: "name 3",
        model: "model",
        manufacturer: "manufacturer",
        measurement_unit: "measurement_unit",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "name",
                value: "value",
                unit: "unit",
            },
        ],
    },
    {
        _id: "5",
        image: "https://example.com/image.jpg",
        product_type: "product_type",
        name: "name 2",
        model: "model",
        manufacturer: "manufacturer",
        measurement_unit: "measurement_unit",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "name",
                value: "value",
                unit: "unit",
            },
        ],
    }
];

export const MainPage = observer(() => {
    const navigate = useNavigate();
    const [vm];
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
                        { mockSkuItems.map(x => (
                            <SteItemCard key={x._id} {...x} />
                        )) }
                    </SteGrid>
                </MainContent>
            </Content>
        </MainContainer>
    );
});

const MainContainer = styled.main`
    padding-top: 32px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start ;
    background: #fff;
    align-items: start;
    left: 0;
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

