import cloudinary from "../config/cloudinary.config.js";

// Extract public_id from a Cloudinary URL so we can delete it
// Example URL: https://res.cloudinary.com/dpp6bx0lu/image/upload/v1234567890/cms-uploads/abc123.jpg
// public_id  : cms-uploads/abc123
function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

// Walk any object/array recursively and collect every Cloudinary URL found
export function collectCloudinaryUrls(value: unknown): string[] {
  if (typeof value === "string") {
    return value.includes("res.cloudinary.com") ? [value] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap(collectCloudinaryUrls);
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap(
      collectCloudinaryUrls,
    );
  }
  return [];
}

// Upload a single multer file (in memory) to Cloudinary and return the secure URL
export async function uploadFileToCloudinary(
  file: Express.Multer.File,
): Promise<string> {
  if (!file.buffer || file.buffer.length === 0) {
    throw new Error(`Empty buffer for file: ${file.fieldname}`);
  }

  const dataURI = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "cms-uploads",
  });
  return result.secure_url;
}

// Build a fieldname → Cloudinary URL map by uploading all files in parallel
export async function buildUrlMap(
  files: Express.Multer.File[],
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  await Promise.all(
    files.map(async (file) => {
      const url = await uploadFileToCloudinary(file);
      map.set(file.fieldname, url);
    }),
  );
  return map;
}

// Keep image assets in Cloudinary to avoid cross-environment breakage.
// Local and live deployments may use different MongoDB databases but the same Cloudinary account.
export async function deleteCloudinaryImages(_urls: string[]): Promise<void> {
  return;
}
