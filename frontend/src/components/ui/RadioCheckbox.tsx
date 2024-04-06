import styled from "@emotion/styled";
import { Stack } from "components/stack.components.tsx";

interface RadioCheckboxProps {
    checked: boolean
    onChange: (value: boolean) => void
    label: string
    id: string
    name: string
    value: string
}

export const RadioCheckbox = (x: RadioCheckboxProps) => {
    return (
        <Stack direction="row" gap={4}>
            <input type="radio"
                   style={{ display: "hidden" }}
                   checked={x.checked}
                   onChange={e => x.onChange(e.target.checked)}
                   id={x.id}
                   name={x.name}
                   value={x.value} />
            { x.label }
        </Stack>
    );
};

