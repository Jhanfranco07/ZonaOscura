import { v2 as cloudinary } from "cloudinary";

const formatosPermitidos = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic", "image/heif"];
const maximoBytes = 5 * 1024 * 1024;

export async function subirImagen(file: File) {
  if (!formatosPermitidos.includes(file.type)) {
    throw new Error("Solo se permiten imágenes jpg, jpeg, png, webp, heic o heif.");
  }
  if (file.size > maximoBytes) {
    throw new Error("La imagen supera el tamaño permitido.");
  }
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary no está configurado. Agrega CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const bytes = Buffer.from(await file.arrayBuffer());
  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "zonaoscura/reportes" }, (error, uploadResult) => {
        if (error || !uploadResult) reject(error);
        else resolve(uploadResult);
      })
      .end(bytes);
  });

  return {
    urlImagen: result.secure_url,
    claveStorage: result.public_id,
    nombreArchivo: file.name,
    tipoArchivo: file.type,
    tamanioBytes: file.size
  };
}
