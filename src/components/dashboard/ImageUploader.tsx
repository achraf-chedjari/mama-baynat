"use client";
import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { uploadHouseImage } from "@/lib/upload-actions";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        if (file.size > 5 * 1024 * 1024) continue;

        const fd = new FormData();
        fd.append("file", file);
        const url = await uploadHouseImage(fd);
        onChange([...images, url]);
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">صور المنزل</p>
        <label
          className="flex cursor-pointer items-center gap-1 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "جاري الرفع..." : "إضافة صور"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((url, index) => (
          <div key={index} className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img
              src={url}
              alt={`صورة ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
            {index === 0 && (
              <span className="absolute bottom-1 right-1 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
                رئيسية
              </span>
            )}
          </div>
        ))}
        {!uploading && images.length === 0 && (
          <div
            onClick={() => inputRef.current?.click()}
            className="col-span-full flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-10 text-gray-400 transition-all hover:border-primary hover:text-primary"
          >
            <ImageIcon className="mb-2 h-10 w-10" />
            <p className="text-sm">انقر أو أسحب الصور هنا</p>
            <p className="mt-1 text-xs">PNG, JPG, WebP - حد أقصى 5MB</p>
          </div>
        )}
      </div>
    </div>
  );
}
