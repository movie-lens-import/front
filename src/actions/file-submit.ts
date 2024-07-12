"use server";

export default async function fileSubmit(formData: FormData) {
  const chunk = formData.get("file") as File;
  const name = formData.get("name");
  const chunkNumber = formData.get("chunkNumber");
  const totalChunks = formData.get("totalChunks");
}
