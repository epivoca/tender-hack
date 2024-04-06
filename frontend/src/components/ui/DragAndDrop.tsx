import React from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import cutFileName from "../../service/scripts/cutFileName";
import RoundSelection from "../roundSelection/RoundSelection";
import Button from "../ui/button/Button";

interface IProps {
    updateDocument: () => void
}

export const DragAndDrop = (props: IProps) => {
    const { updateDocument } = props;
    const { token, logout } = React.useContext(AuthContext);
    const [files, setFiles] = React.useState<File[]>([]);
    const [drag, setDrag] = React.useState(false);
    const [dragCounter, setDragCounter] = React.useState(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    //set files to formData

    const sendFiles = () => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });
        fetch("http://localhost:1337/api/documents", {
            method: "POST",
            headers: {
                "Authorization": "Token " + token,
                //'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then(response => {
            if (response.status === 401) {
                return logout();
            }
            return response.json();

        })
            .catch(() => {
                console.log("fetch err");
            })
            .finally(() => updateDocument()).then(() => setFiles([]));
    };
    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(dragCounter + 1);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDrag(true);
        }
        //and make cursor change
        e.dataTransfer.dropEffect = "copy";
        e.dataTransfer.effectAllowed = "copy";
    };

    const isPdfOrDocOrDocx = (file: File) => {
        return file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    };
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(dragCounter - 1);
        if (dragCounter > 0) return;
        setDrag(false);
    };
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
            setDragCounter(0);
        }
    };
    const handleFiles = (files: FileList) => {
        for (let i = 0; i < files.length; i++) {
            if (isPdfOrDocOrDocx(files[i])) {
                setFiles([...files]);
            }
        }
    };
    const openFileDialog = () => {
        //only pdf docx doc files and add to array
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const handleSubmit = () => {
        sendFiles();
    };

    return (
        <>
            { files.length === 0 ? (
                <><DragAndDropZone>
                    <p>Перетащите сюда документы <br />или</p>
                    <DragAndDropInput onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter}
                                      onDragLeave={onDragLeave}
                                      ref={fileInputRef} type='file' multiple={true} onChange={onChange} />
                    <Button main={false} onClick={openFileDialog}>Выберите файл</Button>
                </DragAndDropZone><p>Только форматы pdf, doc, docx. До
                    5Мб</p></>
            ) : (
                <><FileNamesContainer>
                    { files.map((file, index) => {
                        return (
                            <RoundSelection key={index} title={cutFileName(file.name)} onClick={() => {
                                setFiles(files.filter(f => f.name !== file.name));
                            }} />
                        );
                    }) }
                </FileNamesContainer><AnalyzeButton main={true} onClick={handleSubmit}>Анализировать</AnalyzeButton></>
            ) }
        </>
    );
};

export default DragAndDrop;

const DragAndDropZone = styled.div`
  position: relative;
  margin-top: 24px;
  width: 100%;
  gap: 10px;
  border: 3px dashed #404040;
  color: ${props => props.theme.colors.technical};
  border-radius: 24px;
  height: 164px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;

  p {
    font-weight: 500;
    font-size: 14px;
  }
`;

const DragAndDropInput = styled.input`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
`;

const FileNamesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  flex-wrap: wrap;
  margin-top: 24px;
  gap: 8px;
`;

const AnalyzeButton = styled(Button)`
  margin-top: 24px;
`;
