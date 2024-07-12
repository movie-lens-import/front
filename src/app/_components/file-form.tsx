"use client";

import fileSubmit from "@/actions/file-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function FileForm() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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

    // Define the chunk size
    const chunkSize = 5 * 1024 * 1024; // 5 * 1024 * 1024 byte
    const totalChunks = Math.ceil(selectedFile.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;

    const handleChunk = async () => {
      // Get the chunk
      end = start + chunkSize;

      // Check if the end slice of the chunk is greater than the file size
      if (end > selectedFile.size) {
        end = selectedFile.size;
      }

      const chunk = selectedFile.slice(start, end);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("name", selectedFile.name);
      formData.append("chunkNumber", chunkNumber.toString());
      formData.append("totalChunks", totalChunks.toString());

      // Update the start position to the end of the previous chunk
      start = end;

      // Submit the chunk
      await fileSubmit(formData);

      // Update the progress
      setUploadProgress((prev) => prev + chunkProgress);

      // Check if there are more chunks to upload
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
      toast({
        duration: 5000,
        variant: "default",
        title: "Success",
        description: "File uploaded successfully.",
      });
    }
  }, [toast, uploadProgress]);

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        type="file"
        name="file"
        className="mt-4"
        accept=".csv"
        onChange={handleFileChange}
      />
      <span className="pl-0.5 text-sm text-muted-foreground">
        Only .csv files are allowed
      </span>

      <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </Button>

      <div className={cn(["mt-3 w-full h-1 rounded bg-secondary"])}>
        <div
          className={cn(["h-full rounded bg-primary"])}
          style={{
            width: `${uploadProgress}%`,
          }}
        />
      </div>
    </form>
  );
}
