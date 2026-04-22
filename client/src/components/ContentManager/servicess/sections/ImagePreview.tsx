import { useImagePreview } from "./useImagePreview";

type ImagePreviewProps = {
  value: unknown;
  alt?: string;
  className?: string;
  allowFileList?: boolean;
};

const ImagePreview = ({
  value,
  alt = "Current image",
  className = "mt-2 h-20 rounded object-cover",
  allowFileList = false,
}: ImagePreviewProps) => {
  const previewUrl = useImagePreview(value, allowFileList);

  if (!previewUrl) {
    return null;
  }

  return <img src={previewUrl} alt={alt} className={className} />;
};

export default ImagePreview;
