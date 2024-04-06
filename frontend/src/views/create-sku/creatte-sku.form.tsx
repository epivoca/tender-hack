import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Stack } from "components/stack.components.tsx";
import { Text } from "components/text.component.tsx";
import { PrimaryButton } from "components/ui/button.tsx";
import { LabeledDropdown2 } from "components/ui/dropdown.tsx";
import { CreateSkuFormViewModel } from "views/create-sku/create-sku.form.vm.ts";

export const SkuForm = observer(() => {
    const [vm] = useState(() => new CreateSkuFormViewModel());

    const onSubmit = () => {
        void vm.submitForm();
    };
    return (
        <form>
            <Stack direction="column" gap={24}>
                <DragAndDrop label={"Изображения"}
                             onChange={v => vm.setImage(v)}
                             id={"image"}
                             isRequired={vm.isFieldRequired("image")} />

                <LabeledInput label={"Наименование"}
                              onChange={v => vm.onNameChange(v)}
                              value={vm.form.name}
                              id={"name"}
                              isRequired={vm.isFieldRequired("name")} />
                <LabeledDropdown label={"Категория"} onChange={v => vm.form.product_type = v} value={vm.form.product_type} isRequired={true} options={vm.productTypes} />
                <LabeledInput label={"Модель"} onChange={v => vm.form.model = v} value={vm.form.model} isRequired={true} />
                <LabeledDropdown label={"Производитель"} onChange={v => vm.form.manufacturer = v} value={vm.form.manufacturer} isRequired={true} options={vm.manufacturers} />
                <LabeledDropdown label={"Единица измерения"} onChange={v => vm.form.measurement_unit = v} value={vm.form.measurement_unit} isRequired={true} options={vm.measurementUnits} />
                <LabeledInput label={"Классификация ГОСТ/ТУ"} onChange={v => vm.form.gost_classification = v} value={vm.form.gost_classification} isRequired={false} />
                <LabeledDropdown label={"Страна происхождения"} onChange={v => vm.form.country_of_origin = v} value={vm.form.country_of_origin} isRequired={true} options={vm.countries_of_origin} />
                <CharachteristicsHeader>ХАРАКТЕРИСТИКИ</CharachteristicsHeader>
                <Stack direction="row" gap={24} justify={"end"}>
                    <PrimaryButton onClick={onSubmit} type="button">
                        Проверить и отправить заявку на СТЕ</PrimaryButton>
                </Stack>
            </Stack>
        </form>
    );
});

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

interface LabeledInputProps {
    label: string
    onChange: (v: string) => void
    value: string
    isRequired?: boolean
    type?: string
    placeholder?: string
    id?: string | number
}

const LabeledInput = observer((x: LabeledInputProps) => {
    return (
        <Stack direction="column" gap={4}>
            <Label>{ x.label }<Text color={"#B91827"}>{ x.isRequired ? "*" : "" }</Text></Label>
            <Input type={x.type} placeholder={x.placeholder} value={x.value} onChange={e => x.onChange(e.target.value)} />
        </Stack>
    );
});

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
    id?: string
}

const LabeledDropdown = observer((x: LabeledDropdownProps) => {
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

interface DragAndDropProps {
    id?: string
    label: string
    isRequired?: boolean
    onChange: (file: File) => void
    value?: File

}
const DragAndDrop = observer((x: DragAndDropProps) => {
    const [file, setFile] = React.useState<File | null>(null);
    const [dragging, setDragging] = React.useState<boolean>(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            return x.onChange(e.target.files[0]);
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    //drag and drop with hidden input for file selection

    return (
        <Stack direction="column" gap={8} id={x.id}>
            <Label>{ x.label }<Text color={"#B91827"}>{ x.isRequired ? "*" : "" }</Text></Label>
            <DragAndDropZone onClick={openFileDialog}>
                <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} style={{ cursor: "pointer" }}>
                    <Text color={"#1a1a1a"}>Перетащите файл сюда или нажмите на блок для выбора файла</Text>
                </div>
                <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={onChange} accept=".png,.jpg,.jpeg" />
                { file && <Text size={12} color={"#7a7a7a"}>{ file.name }</Text> }
            </DragAndDropZone>
        </Stack>
    );
});

const DragAndDropZone = styled.div`
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%237D93B4FF' stroke-width='1' stroke-dasharray='8 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 24px;
`;

const CharachteristicsHeader = styled.h4`
    font-size: 16px;
    font-weight: 800;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;    
    
    
    //line before and after text
    &:before {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #E7EEF7;
        margin-top: 4px;
    }
    
    &:after {
        content: "";
        padding: 0 8px;
        display: block;
        width: 100%;
        height: 1px;
        background: #E7EEF7;
        margin-top:  4px;
    }
`;

