"use server";

import fs from "fs";
import path from "path";

export default async function fileSubmit(formData: FormData) {
  const chunk = formData.get("file") as File;
  const name = formData.get("name") as string;
  const chunkNumber = Number(formData.get("chunkNumber"));
  const totalChunks = Number(formData.get("totalChunks"));

  const chunkDir = path.join(process.cwd(), "/chunks");

  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }

  const chunkFilePath = path.join(chunkDir, `${name}.part_${chunkNumber}`);

  const chunkBuffer = Buffer.from(await chunk.arrayBuffer());
  fs.writeFileSync(chunkFilePath, chunkBuffer);

  if (chunkNumber == totalChunks - 1) {
    const filePath = path.join(chunkDir, name);
    const writeStream = fs.createWriteStream(filePath);

    for (let i = 0; i < totalChunks; i++) {
      const partPath = path.join(chunkDir, `${name}.part_${i}`);
      const data = fs.readFileSync(partPath);
      writeStream.write(data);
      fs.unlinkSync(partPath);
    }

    writeStream.end();

    await fetch(`${process.env.FLASK_API_URL}/convert`, {
      method: "POST",
      body: JSON.stringify({ name, table: "ratings" }),
      headers: { "Content-Type": "application/json" },
    });
  }
}
