import { useEffect, useRef, useState } from "react";

export const useImagePreview = (
  value: unknown,
  allowFileList = false,
): string | null => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const createdObjectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (createdObjectUrlRef.current) {
      URL.revokeObjectURL(createdObjectUrlRef.current);
      createdObjectUrlRef.current = null;
    }

    if (typeof value === "string" && value.startsWith("http")) {
      setPreviewUrl(value);
      return;
    }

    if (
      allowFileList &&
      typeof FileList !== "undefined" &&
      value instanceof FileList &&
      value.length > 0
    ) {
      const objectUrl = URL.createObjectURL(value[0]);
      createdObjectUrlRef.current = objectUrl;
      setPreviewUrl(objectUrl);
      return;
    }

    setPreviewUrl(null);
  }, [value, allowFileList]);

  useEffect(() => {
    return () => {
      if (createdObjectUrlRef.current) {
        URL.revokeObjectURL(createdObjectUrlRef.current);
        createdObjectUrlRef.current = null;
      }
    };
  }, []);

  return previewUrl;
};
