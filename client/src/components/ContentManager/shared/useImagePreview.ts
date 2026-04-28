import { useEffect, useMemo } from "react";

export const useImagePreview = (
  value: unknown,
  allowFileList = false,
): string | null => {
  const previewUrl = useMemo(() => {
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }

    if (
      allowFileList &&
      typeof FileList !== "undefined" &&
      value instanceof FileList &&
      value.length > 0
    ) {
      return URL.createObjectURL(value[0]);
    }

    return null;
  }, [value, allowFileList]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return previewUrl;
};
