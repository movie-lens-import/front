"use client";

import fileSubmit from "@/actions/file-submit";
import { useToast } from "@/components/ui/use-toast";
import { useState, useRef, useEffect } from "react";

export function useFileForm() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      toast({
        duration: 5000,
        variant: "destructive",
        title: "Error",
        description: "Please, select a file first.",
      });
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    const chunkSize = 5 * 1024 * 1024; // 5 * 1024 * 1024 byte
    const totalChunks = Math.ceil(selectedFile.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;

    const handleChunk = async () => {
      end = start + chunkSize;

      if (end > selectedFile.size) {
        end = selectedFile.size;
      }

      const chunk = selectedFile.slice(start, end);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("name", selectedFile.name);
      formData.append("chunkNumber", chunkNumber.toString());
      formData.append("totalChunks", totalChunks.toString());

      start = end;

      await fileSubmit(formData);

      setUploadProgress((prev) => prev + chunkProgress);

      if (start < selectedFile.size) {
        chunkNumber++;
        await handleChunk();
      }
    };

    await handleChunk();

    setIsLoading(false);
  };

  useEffect(() => {
    if (Math.floor(uploadProgress) == 100) {
      setSelectedFile(null);
      if (fileInput.current) {
        fileInput.current.value = "";
      }
      toast({
        duration: 5000,
        variant: "default",
        title: "Success",
        description: "File uploaded successfully.",
      });
    }
  }, [toast, uploadProgress]);

  return {
    isLoading,
    selectedFile,
    uploadProgress,
    fileInput,
    handleFileChange,
    handleFormSubmit,
  };
}
