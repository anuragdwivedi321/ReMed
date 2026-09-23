"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Camera, RotateCcw, Upload, X, ImagePlus } from "lucide-react";
import { PhotoAsset } from "@/lib/types";

interface CameraCaptureProps {
  label: PhotoAsset["label"];
  title: string;
  helperText?: string;
  photos: PhotoAsset[];
  onChange: (photos: PhotoAsset[]) => void;
  maxPhotos?: number;
}

const MAX_FILE_SIZE = 12 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1600;

function compressImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Unsupported image format"));
      image.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) return reject(new Error("Image processing is unavailable"));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.84));
      };
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function CameraCapture({
  label,
  title,
  helperText,
  photos,
  onChange,
  maxPhotos = 3,
}: CameraCaptureProps) {
  const [streaming, setStreaming] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [processingFiles, setProcessingFiles] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputId = useId();

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStreaming(false);
  }, []);

  useEffect(() => stopStream, [stopStream]);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStreaming(true);
    } catch {
      setCameraError(
        "Couldn't access the camera. You can still upload a photo below."
      );
      setStreaming(false);
    }
  }, []);

  const snap = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    const asset: PhotoAsset = { id: crypto.randomUUID(), dataUrl, label };
    onChange([...photos, asset].slice(0, maxPhotos));
    stopStream();
  }, [label, photos, onChange, maxPhotos, stopStream]);

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      setFileError(null);
      setProcessingFiles(true);

      const availableSlots = maxPhotos - photos.length;
      const selected = Array.from(fileList).slice(0, availableSlots);
      const validFiles = selected.filter(
        (file) => file.type.startsWith("image/") && file.size <= MAX_FILE_SIZE
      );

      if (validFiles.length !== selected.length) {
        setFileError("Use a JPG, PNG, or WEBP image under 12 MB.");
      }

      const newPhotos = await Promise.all(
        validFiles.map(async (file) => ({
          id: crypto.randomUUID(),
          dataUrl: await compressImage(file),
          label,
        }))
      ).catch(() => {
        setFileError("This image could not be opened. Please use JPG, PNG, or WEBP.");
        return [];
      });

      onChange([...photos, ...newPhotos].slice(0, maxPhotos));
      setProcessingFiles(false);
    },
    [label, photos, onChange, maxPhotos]
  );

  const removePhoto = (id: string) => {
    onChange(photos.filter((p) => p.id !== id));
  };

  const atLimit = photos.length >= maxPhotos;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm w-full max-w-full min-w-0 overflow-hidden">
      <div className="flex items-center justify-between gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{title}</h3>
          {helperText && <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 truncate">{helperText}</p>}
        </div>
        <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold text-[#0072d2] shrink-0">
          {photos.length}/{maxPhotos}
        </span>
      </div>

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 min-w-0">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl border border-sky-200 shadow-xs shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.dataUrl}
                alt="Uploaded medicine"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                aria-label="Remove photo"
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-950 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {!atLimit && (
        <div className="mt-3 w-full max-w-full min-w-0">
          {streaming ? (
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-md w-full max-w-full">
              <video
                ref={videoRef}
                className="aspect-video w-full max-w-full object-cover"
                playsInline
                muted
              />
              <div className="flex items-center justify-center gap-2 bg-slate-900 p-2.5">
                <button
                  type="button"
                  onClick={snap}
                  className="flex items-center gap-1.5 rounded-xl bg-[#0072d2] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#005bb5] transition-all"
                >
                  <Camera size={14} /> Capture Photo
                </button>
                <button
                  type="button"
                  onClick={stopStream}
                  className="flex items-center gap-1 rounded-xl border border-white/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw size={13} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 rounded-2xl border-2 border-dashed p-4 sm:p-5 text-center transition-all w-full max-w-full min-w-0 ${
                dragOver
                  ? "border-[#0072d2] bg-sky-50/60"
                  : "border-slate-200 bg-slate-50/50 hover:bg-sky-50/30"
              }`}
            >
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-sky-100 text-[#0072d2]">
                <ImagePlus size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-700 leading-snug">
                Drag &amp; drop a photo, or choose below
              </p>
              <p className="text-[10px] text-slate-400">
                Supports JPG, PNG, WEBP (Max 12 MB)
              </p>

              <div className="mt-1 flex flex-wrap justify-center items-center gap-2 w-full max-w-full">
                <label
                  htmlFor={`${inputId}-native-camera`}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-3 py-2 text-xs font-bold text-white shadow-2xs hover:brightness-105 active:scale-95 transition-all"
                >
                  <Camera size={14} /> Take Photo
                </label>
                <label
                  htmlFor={inputId}
                  aria-disabled={processingFiles}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-[#0072d2] hover:text-[#0072d2] active:scale-95 transition-all shadow-2xs"
                >
                  <Upload size={14} /> Upload
                </label>
                <button
                  type="button"
                  onClick={startCamera}
                  className="hidden min-[480px]:inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Camera size={13} /> WebCam
                </button>
              </div>

              {processingFiles && (
                <p className="text-xs font-semibold text-[#0072d2] animate-pulse">
                  Optimizing photo…
                </p>
              )}
              {cameraError && (
                <p className="text-xs font-medium text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                  {cameraError}
                </p>
              )}
              {fileError && (
                <p role="alert" className="text-xs font-medium text-red-600">
                  {fileError}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Standard Gallery / File Picker */}
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          const files = e.currentTarget.files;
          void handleFiles(files);
          e.currentTarget.value = "";
        }}
      />
      {/* Native Camera Direct Launcher for Mobile */}
      <input
        id={`${inputId}-native-camera`}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          const files = e.currentTarget.files;
          void handleFiles(files);
          e.currentTarget.value = "";
        }}
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
