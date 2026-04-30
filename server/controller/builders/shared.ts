import {
  buildUrlMap,
  collectCloudinaryUrls,
  deleteCloudinaryImages,
} from "../../utils/cloudinary.utils.js";

export function parseJsonField<T>(value: unknown): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value as string);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function pickImageUrl(
  ...candidates: Array<string | null | undefined>
): string | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }
  return undefined;
}

function normalizeMulterFiles(rawFiles: unknown): Express.Multer.File[] {
  if (!rawFiles) return [];
  if (Array.isArray(rawFiles)) {
    return rawFiles as Express.Multer.File[];
  }

  const groups = Object.values(
    rawFiles as Record<string, Express.Multer.File[] | undefined>,
  );
  return groups.flatMap((group) => group ?? []);
}

export async function createFileUrlResolver(
  rawFiles: unknown,
): Promise<(fieldName: string) => string | undefined> {
  const filesArray = normalizeMulterFiles(rawFiles);
  const urlMap = await buildUrlMap(filesArray);
  return (fieldName: string): string | undefined => urlMap.get(fieldName);
}

export async function cleanupRemovedCloudinaryUrls(
  oldValue: unknown,
  newValue: unknown,
): Promise<void> {
  const oldUrls = collectCloudinaryUrls(oldValue);
  const newUrls = new Set(collectCloudinaryUrls(newValue));
  await deleteCloudinaryImages(oldUrls.filter((url) => !newUrls.has(url)));
}
