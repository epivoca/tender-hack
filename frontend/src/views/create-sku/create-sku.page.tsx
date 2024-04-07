import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { Stack } from "components/stack.components.tsx";
import { Text } from "components/text.component.tsx";
import { RadioCheckbox } from "components/ui/RadioCheckbox.tsx";
import { Content } from "components/ui/header.tsx";
import { Segment } from "components/ui/segment.tsx";
import { SkuForm } from "views/create-sku/create-sku.form.tsx";

export const CreateSkuPage: React.FC = observer(() => {
    return (
        <Content>
            <CreateSkuPageContainer>
                <SkuForm />
                <Stack direction="column" gap={24}>
                    <Text size={24} weight={700}>Похожие СТЕ</Text>
                </Stack>
            </CreateSkuPageContainer>
        </Content>
    );
});

const CreateSkuPageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
    padding: 24px;
    width: 100%;
    height: 100%;
`;

