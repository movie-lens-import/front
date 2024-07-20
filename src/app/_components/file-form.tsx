"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useFileForm } from "./file-form.hook";

export function FileForm() {
  const {
    handleFormSubmit,
    handleFileChange,
    isLoading,
    uploadProgress,
    fileInput,
  } = useFileForm();

  return (
    <Card className="w-full max-w-md p-3">
      <CardHeader>
        <CardTitle>Insert a MovieLens 20M file</CardTitle>
        <CardDescription>
          Upload a .csv file to save to database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInput}
          />
          <span className="pl-0.5 text-xs font-medium text-muted-foreground">
            Only .csv files are allowed
          </span>

          <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload"}
          </Button>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div
              className={cn([
                "z-10 fixed top-0 left-0 w-full h-2 bg-secondary",
              ])}
            >
              <div
                className={cn([
                  "h-full bg-primary transition-all duration-150",
                ])}
                style={{
                  width: `${uploadProgress}%`,
                }}
              />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
