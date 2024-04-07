import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { SkuDto } from "api/models/sku.model.ts";
import { Stack } from "components/stack.components.tsx";
import { Text } from "components/text.component.tsx";
import { CancelButton, GreyButton, PrimaryButton } from "components/ui/button.tsx";
import { CustomDropdown, DropdownWithSearch } from "components/ui/dropdown.tsx";
import { Segment } from "components/ui/segment";
import { CreateSkuFormViewModel } from "views/create-sku/create-sku.form.vm.ts";

export const SkuForm = observer(() => {
    const [vm] = useState(() => new CreateSkuFormViewModel());

    const onSubmit = () => {
        void vm.submitForm();
    };
    return (
        <form style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
            <Segment>
                <Stack direction="column" gap={24}>
                    <DragAndDrop label={"Изображения"}
                                 onChange={v => vm.setImage(v)}
                                 id={"image"}
                                 isRequired={vm.isFieldRequired("image")} />

                    <DropdownWithSearch label={"Наименование"}
                                        onChange={v => vm.onNameChange(v)}
                                        id={"name"}
                                        searchValue={vm.form.name}
                                        onSearchChange={v => vm.onNameChange(v)}
                                        options={vm.predictNames}
                                        isRequired={vm.isFieldRequired("name")}
                                        searchPlaceholder={"Введите наименование"} />
                    <CustomDropdown label={"Категория"} onChange={v => vm.form.product_type = v} value={vm.form.product_type} isRequired={true} options={vm.productTypes} />
                    <LabeledInput label={"Модель"} onChange={v => vm.form.model = v} value={vm.form.model} isRequired={true} />
                    <CustomDropdown label={"Производитель"} onChange={v => vm.form.manufacturer = v} value={vm.form.manufacturer} isRequired={true} options={vm.manufacturers} />
                    <CustomDropdown label={"Единица измерения"} onChange={v => vm.form.measurement_unit = v} value={vm.form.measurement_unit} isRequired={true} options={vm.measurementUnits} />
                    <LabeledInput label={"Классификация ГОСТ/ТУ"} onChange={v => vm.form.gost_classification = v} value={vm.form.gost_classification} isRequired={false} />
                    <CustomDropdown label={"Страна происхождения"} onChange={v => vm.form.country_of_origin = v} value={vm.form.country_of_origin} isRequired={true} options={vm.countries_of_origin} />
                    <CharachteristicsHeader>ХАРАКТЕРИСТИКИ</CharachteristicsHeader>
                    <Charachteristics />
                </Stack>
            </Segment>
            <Segment>
                <Stack direction="row" gap={24} justify={"end"}>
                    <PrimaryButton onClick={onSubmit} type="button">
                        Проверить и отправить заявку на СТЕ</PrimaryButton>
                </Stack>
            </Segment>
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
    const [base64Image, setBase64Image] = React.useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setBase64Image(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            return x.onChange(e.target.files[0]);
        }
        setBase64Image(URL.createObjectURL(e.target.files![0]));
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

    const onFileDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setFile(null);
    };

    return (
        <Stack direction="column" gap={8} id={x.id}>
            <Label>{ x.label }<Text color={"#B91827"}>{ x.isRequired ? "*" : "" }</Text></Label>
            <DragAndDropZone onClick={openFileDialog}>
                <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} style={{ cursor: "pointer" }}>
                    <Text color={"#1a1a1a"} align={"center"}>Перетащите файл сюда или нажмите на блок для выбора файла</Text>
                </div>
                <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={onChange} accept=".png,.jpg,.jpeg" />
                { file && (
                    <Stack direction="column" gap={4} wFull justify={"center"} align={"center"} style={{ border: "1px solid #e7eef7", maxWidth: "256px", background: "#fff", padding: "8px", borderRadius: "4px", position: "relative" }}>
                        { base64Image && <img src={base64Image} alt={file.name} style={{ width: "128px", height: "128px", objectFit: "cover" }} /> }
                        <Text size={12} align={"center"} color={"#7a7a7a"}>{ file.name }</Text>
                        <button onClick={onFileDelete} style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", cursor: "pointer" }}><Text size={24} style={{ lineHeight: "12px" }} color={"#7a7a7a"}>×</Text></button>
                    </Stack>
                ) }

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
    gap: 32px;
    min-height: 128px;
    padding: 24px;

    &:hover {
        background-color: rgba(247, 249, 252, 0.75);
    }
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

const Charachteristics = observer(() => {
    const [isOpen, setIsOpen] = useState(false);
    const onHandleOpen = () => {
        setIsOpen(true);
        //disable page scrolla
        document.body.style.overflow = "hidden";
    };

    const onHandleClose = () => {
        setIsOpen(false);
        document.body.style.overflow = "visible";
    };
    return (
        <CharachteristicTable>
            <CharachteristicTableHeader>
                <tr>
                    <Th>Наименование</Th>
                    <Th>Значение</Th>
                    <Th>Единица измерения</Th>
                </tr>
            </CharachteristicTableHeader>
            <tbody>
                <tr>
                    <Td>Длина</Td>
                    <Td>100</Td>
                    <Td>мм</Td>
                </tr>
                <tr>
                    <Td>Ширина</Td>
                    <Td>100</Td>
                    <Td>мм</Td>
                </tr>
                <tr>
                    <Td>Высота</Td>
                    <Td>100</Td>
                    <Td>мм</Td>
                </tr>
                <tr>
                    <Td>Вес</Td>
                    <Td>100</Td>
                    <Td>кг</Td>
                </tr>
            </tbody>
            <Stack direction={"row"} wFull gap={24} style={{ padding: "16px" }}>
                <GreyButton onClick={onHandleOpen} type={"button"}>Добавить/изменить характеристики</GreyButton>
            </Stack>
            <Modal style={customStyles}
                   isOpen={isOpen}
                   contentLabel={"Добавить/изменить характеристику"}>
                <ModalBody>
                    <ModalContent onClose={onHandleClose} />
                </ModalBody>
            </Modal>
        </CharachteristicTable>
    );
}
);

interface ModalContentProps {
    onClose: () => void
}
const ModalContent = observer<ModalContentProps>(x => {
    return (
        <ModalBody>
            <Stack direction={"column"} gap={24}>
                <TableHeader>
                    <TableBaseContainer>
                        <Text size={18} weight={700}>Добавить/изменить характеристику</Text>
                    </TableBaseContainer>
                </TableHeader>
                <ScrollableContainer>
                    <Segment>
                        <CharachteristisModalItem item={{ value: "100", name: "Длина", unit: "мм" }} />
                        <CharachteristisModalItem item={{ value: "100", name: "Ширина", unit: "мм" }} />
                        <CharachteristisModalItem item={{ value: "100", name: "Высота", unit: "мм" }} />
                    </Segment>
                </ScrollableContainer>
                <Stack direction={"row"} wFull gap={24} justify={"end"}>
                    <TableBaseContainer style={{ borderTop: "1px solid #E7EEF7", justifyContent: "end", gap: "24px", padding: "16px" }}>
                        <CancelButton type={"button"} onClick={x.onClose}>Закрыть</CancelButton>
                        <PrimaryButton type={"button"}>Добавить</PrimaryButton>
                    </TableBaseContainer>
                </Stack>
            </Stack>
        </ModalBody>
    );
});

interface CharachteristicModalFormProps {
    item: SkuDto.Characteristic
}

const CharachteristisModalItem = observer<CharachteristicModalFormProps>(x => {
    return (
        <Stack direction={"column"} gap={12} style={{ borderBottom: "1px solid #E7EEF7", paddingBottom: "16px", paddingTop: "8px" }}>
            <LabeledInput label={"Наименование"} onChange={v => console.log(v)} value={x.item.name} isRequired={true} />
            <Stack direction={"row"} gap={12} justify={"end"}>
                <PrimaryButton type={"button"} size={"small"}>Удалить</PrimaryButton>
            </Stack>
        </Stack>
    );
});

const ScrollableContainer = styled.div`
    overflow: auto;
    height: 100%;
    padding: 16px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const TableBaseContainer = styled.div`
    padding: 8px;
    display: flex;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    `;

const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #E7EEF7;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 712px;
    min-height: 512px;
    overflow: hidden;
`;

const customStyles = {
    content: {
        top: "50%",
        padding: "0",
        boxShadow: "0 5px 20px rgba(131, 134, 139, .25)",
        border: "1px solid #E7EEF7",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        zIndex: 1001,
        transform: "translate(-50%, -50%)",
    },
} as Modal.Styles;

const CharachteristicTable = styled.table`
    width: 100%;
    background: #E7EEF7;
    margin: 1em 0;
    border: none;
    box-shadow: 0 5px 20px rgba(131, 134, 139, .25);
    border-radius: 0;
    text-align: left;
    font-size: 12px;
    vertical-align: middle;
    color: #1a1a1a;
    border-collapse: separate;
    border-spacing: 0;
`;

const CharachteristicTableHeader = styled.thead`
    color: #1a1a1a;
    font-size: 14px;
    font-weight: 600;
    border: none;
    text-align: left;
    vertical-align: middle;
`;

const Th = styled.th`
    border-right: 1px solid rgba(34,36,38,.1);
    padding: .92857143em .78571429em;
`;

const Td = styled.td`
    border-right: 1px solid rgba(34,36,38,.1);
    border-top: 1px solid rgba(34,36,38,.1);
    padding: .5em .7em;
    background: #fff;
`;

