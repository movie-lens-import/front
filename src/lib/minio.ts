import Minio from "minio";

export const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "",
  secretKey: process.env.MINIO_SECRET_KEY || "",
});

const bucketName = "file-uploader";

export async function uploadFile(filePath: string, fileName: string) {
  try {
    // Make sure the bucket exists
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      throw new Error("Bucket does not exist");
    }

    // Upload the file
    await minioClient.fPutObject(bucketName, fileName, filePath);
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
