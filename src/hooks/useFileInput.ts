import { useState } from "react";

export function useFileInput() {
  const [imgPreview, setImgPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const fileBlob = new Blob([e.target.result as ArrayBuffer], { type: selectedFile.type });
          const url = URL.createObjectURL(fileBlob);
          setBlob(fileBlob);
          setImgPreview(url);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return {
    file,
    blob,
    imgPreview,
    setFile,
    setBlob,
    setImgPreview,
    handleFileChange,
  };
}
