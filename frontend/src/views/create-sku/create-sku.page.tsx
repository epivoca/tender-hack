import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React from "react";
import { Stack } from "components/stack.components.tsx";
import { Text } from "components/text.component.tsx";
import { RadioCheckbox } from "components/ui/RadioCheckbox.tsx";
import { Content } from "components/ui/header.tsx";
import { Segment } from "components/ui/segment.tsx";
import { Warncontainer } from "components/warn.components.tsx";
import { SkuForm } from "views/create-sku/create-sku.form.tsx";

export const CreateSkuPage: React.FC = observer(() => {
    return (
        <Content>
            <CreateSkuPageContainer>
                { /*<Warncontainer style={{ gridColumn: "1 / 3" }}>*/ }
                { /*    Прежде чем создавать новую оферту и СТЕ убедитесь, что в реестре товаров нет необходимой позиции.<br />*/ }
                { /*    Если похожая продукция уже есть в реестре товаров, вы можете подать ценовое предложение прямо из карточки СТЕ.<br /> В*/ }
                { /*    этом*/ }
                { /*    случае, размещение вашего предложения будет осуществлено быстрее без дополнительной модерации.<br />*/ }
                { /*    Если подходящей продукции не найдено, то заполните форму ниже.<br />*/ }
                { /*    После отправки формы будет автоматически создана заявка для модератора на новую продукцию.<br />*/ }
                { /*    Инструкция по созданию оферты и СТЕ находится по ссылке<br />*/ }
                { /*    В случае утверждения заявки, вы сможете подписать и разместить оферту.</Warncontainer>*/ }
                <SkuForm />
                { /*<Stack direction="column" gap={24}>*/ }
                { /*    <Text size={24} weight={700}>Похожие СТЕ</Text>*/ }
                { /*    <Stack direction="column" gap={16} style={{ width: "100%" }}>*/ }
                { /*        <Warncontainer>Отображение похожих СТЕ временно недоступно.<br />Мы работает над решением этой проблемы!</Warncontainer>*/ }
                { /*    </Stack>*/ }
                { /*</Stack>*/ }
            </CreateSkuPageContainer>
        </Content>
    );
});

const CreateSkuPageContainer = styled.div`
    //display: grid;
    //grid-template-columns: 1fr 1fr;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    grid-gap: 24px;
    padding: 24px;
    width: 100%;
    height: 100%;
`;

