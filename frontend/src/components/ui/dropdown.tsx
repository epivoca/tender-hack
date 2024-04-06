import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React, { useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import { Stack } from "components/stack.components.tsx";
import { Text } from "components/text.component.tsx";

interface LabeledDropdownProps {
    label: string
    onChange: (v: string) => void
    value?: string
    isRequired?: boolean
    options: string[]
    id?: string
}

export const LabeledDropdown2 = observer<LabeledDropdownProps>(props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const referenceElement = useRef(null);
    const popperElement = useRef(null);
    const { styles, attributes } = usePopper(referenceElement.current, popperElement.current, {
        placement: "bottom-start", // This should make the dropdown appear below the "Производитель" field.
        strategy: "absolute"
    });

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <Stack direction="column" gap={4}>
            { /* This element is the reference for your popper positioning. */ }
            <div ref={referenceElement} onClick={toggleDropdown}>
                <Text color="#B91827">{ props.label }{ props.isRequired ? "*" : "" }</Text>
                <Text color="#B91827">{ props.value ?? "Не выбрано" }</Text>
            </div>

            { /* This will render the dropdown menu. */ }
            { dropdownOpen && (
                <div ref={popperElement} style={{ ...styles.popper, zIndex: 100 }} {...attributes.popper}>
                    <Stack direction="column" gap={4}>
                        { props.options.map(option => (
                            <Text key={option} onClick={() => { props.onChange(option); setDropdownOpen(false); }}
                                  style={{ padding: "10px", cursor: "pointer", backgroundColor: option === props.value ? "#f0f0f0" : "transparent" }}>
                                { option }
                            </Text>
                        )) }
                    </Stack>
                </div>
            ) }
        </Stack>
    );
});
