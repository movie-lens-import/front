"use server";

import fs from "fs";
import path from "path";
import csv from "csv-parser";

const tablesHeaders: Record<string, string[]> = {
  ratings: ["userId", "movieId", "rating", "timestamp"],
  movies: ["movieId", "title", "genres"],
  genomescores: ["movieId", "tagId", "relevance"],
  genometags: ["tagId", "tag"],
  links: ["movieId", "imdbId", "tmdbId"],
  tags: ["userId", "movieId", "tag", "timestamp"],
};

export default async function fileSubmit(formData: FormData) {
  const chunk = formData.get("file") as File;
  const name = formData.get("name") as string;
  const chunkNumber = Number(formData.get("chunkNumber"));
  const totalChunks = Number(formData.get("totalChunks"));
  const tableName = formData.get("table") as string;

  const chunkDir = path.join(process.cwd(), "/chunks");

  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }

  const chunkFilePath = path.join(chunkDir, `${name}.part_${chunkNumber}`);

  const chunkBuffer = Buffer.from(await chunk.arrayBuffer());
  fs.writeFileSync(chunkFilePath, chunkBuffer);

  if (chunkNumber === 0) {
    const headersValid = await checkHeaders(chunkFilePath, tableName);
    if (!headersValid) {
      fs.unlinkSync(chunkFilePath);
      throw new Error(
        `CSV headers are invalid for table ${tableName}. Processing stopped.`
      );
    }
  }

  if (chunkNumber === totalChunks - 1) {
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
      body: JSON.stringify({ name, table: tableName }),
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function checkHeaders(filePath: string, table: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const headers: string[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("headers", (headerList) => {
        headers.push(...headerList);
        const headersValid = tablesHeaders[table].every((header) =>
          headers.includes(header)
        );
        resolve(headersValid);
      })
      .on("error", (error) => reject(error));
  });
}
