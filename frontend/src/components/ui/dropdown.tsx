import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Stack } from "components/stack.components.tsx";
import { Text } from "components/text.component.tsx";
import { useKeydown } from "utils/hooks/keydown.hook.ts";
import { useOnClickOutside } from "utils/hooks/on-click-outside.hook.ts";
import { useCollapsible } from "utils/hooks/use-collapsible.ts";

const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
`;

//const dropdown (with custom options)

interface LabeledDropdownProps {
    label: string
    onChange: (v: string) => void
    value?: string
    isRequired?: boolean
    options: string[]
    disabledOptions?: string[]
    id?: string
}

const Drowdown = styled.select`
    border: 1px solid #e7eef7;
    width: 100%;
    font-size: 1em;
    font-weight: 400;
    background: #E7EEF7;
    color: #1a1a1a;
    padding: .67857143em 1em;
    
    &:focus {
        outline: none;
        border-color: transparent;
    }
    
    &:hover {
        border-color: transparent;
    }
`;

export const LabeledDropdown = observer((x: LabeledDropdownProps) => {
    return (
        <Stack direction="column" gap={4}>
            <Label>{ x.label }<Text color={"#B91827"}>{ x.isRequired ? "*" : "" }</Text></Label>
            <Drowdown value={x.value ?? "Не выбрано"} onChange={e => x.onChange(e.target.value)}>
                { x.options.map(o => (
                    <option key={o} value={o} selected={true} disabled={o === "Не выбрано"}>{ o }</option>
                )) }
            </Drowdown>
        </Stack>
    );
});

export const CustomDropdown = observer<LabeledDropdownProps>(x => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = x.options.find(option => option === x.value);
    const colapsebleRef = useCollapsible(isOpen);
    const ref = React.useRef<HTMLDivElement>(null);
    useKeydown("Escape", () => setIsOpen(false), undefined, [isOpen]);
    useOnClickOutside([ref], () => setIsOpen(false));
    const handleSelect = (option: string) => {
        x.onChange(option);
        setIsOpen(false);
    };

    return (
        <CustomDropdownWrapper direction="column" gap={4} ref={ref} key={x.label} onClick={() => setIsOpen(!isOpen)} spellCheck={false}>
            <Label>{ x.label }<Text color={"#B91827"}>{ x.isRequired ? "*" : "" }</Text></Label>
            <DropdownButton type="button">
                { selectedOption ?? "Не выбрано" }
            </DropdownButton>
            { isOpen && (
                <Stack direction="column" gap={4} style={{ display: "contents", height: "100px", overflow: "auto" }}>
                    <OptionsList ref={colapsebleRef}>
                        { x.options.map(option => (
                            <Option key={option} onClick={() => handleSelect(option)} aria-selected={option === selectedOption} aria-disabled={x.disabledOptions?.includes(option)}>
                                { option }
                            </Option>
                        )) }
                    </OptionsList>
                </Stack>
            ) }
        </CustomDropdownWrapper>
    );
});

interface DropdownWithSearchProps extends LabeledDropdownProps {
    searchPlaceholder: string
    searchValue: string
    onSearchChange: (v: string) => void
}

const Input = styled.input`
    border: 1px solid #e7eef7;
    position: relative;
    font-size: 1em;
    font-weight: 400;
    background: #E7EEF7;
    color: #1a1a1a;
    padding: .67857143em 1em;
    
    &:focus {
        outline: none;
        border-color: transparent;
    }
    
    &:hover {
        border-color: transparent;
    }
`;

export const DropdownWithSearch = observer((x: DropdownWithSearchProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = x.options.find(option => option === x.value);
    const colapsebleRef = useCollapsible(isOpen);
    const ref = React.useRef<HTMLDivElement>(null);
    useKeydown("Escape", () => setIsOpen(false), undefined, [isOpen]);

    useKeydown("Tab", () => {
        if (isOpen && x.options.length > 0) {
            x.onChange(x.options[0]);
        }
    }, undefined, [isOpen]);

    useOnClickOutside([ref], () => setIsOpen(false));

    const handleSelect = (option: string, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        x.onChange(option);
        setIsOpen(false);
    };

    const handleDropdownClick = () => {
        setIsOpen(true);
    };

    const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        x.onSearchChange(e.target.value);
        setIsOpen(true);
    };

    return (
        <CustomDropdownWrapper direction="column" gap={4} ref={ref} key={x.label} onClick={handleDropdownClick} spellCheck={false}>
            <Label>{ x.label }<Text color={"#B91827"}>{ x.isRequired ? "*" : "" }</Text></Label>
            <Input placeholder={x.searchPlaceholder} value={x.searchValue} onChange={onInputChanged} />
            { isOpen && Boolean(x.options.length) && (
                <OptionsList>
                    { x.options.map(option => (
                        <Option key={option} onClick={e => handleSelect(option, e)} aria-selected={option === selectedOption} aria-disabled={x.disabledOptions?.includes(option)}>
                            { option }
                        </Option>
                    )) }
                </OptionsList>
            ) }
        </CustomDropdownWrapper>
    );
});

const CustomDropdownWrapper = styled(Stack)`
    position: relative;
    width: 100%;
`;

const DropdownButton = styled.button`
    border: 1px solid #e7eef7;
    width: 100%;
    display: flex;
    justify-content: start;
    font-size: 1em;
    font-weight: 400;
    background: #E7EEF7;
    color: #1a1a1a;
    padding: .67857143em 1em;

    &:focus {
        outline: none;
        border-color: transparent;
    }

    &:hover {
        border-color: transparent;
    }
`;

const OptionsList = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    top: 68px;
    height: max-content;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #e7eef7;

`;

const Option = styled.div<{ ["aria-selected"]?: boolean; ["aria-disabled"]?: boolean }>`
    background: #fafafa;
    height: 42px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #edf0f3;
    padding: 0 16px;
    
    &[aria-selected="true"] {
        background: #f0f0f0;
        font-weight: 700;
    }
    
    &[aria-disabled="true"] {
        background: #fafafa;
        color: #9b9b9b;
        cursor: not-allowed;
        user-select: none;
    }
    
    &:last-child {
        border-bottom: none;
    }
    
    &:hover {
        background: #f0f0f0;
    }
`;
