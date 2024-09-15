import { z } from "zod";

export const ImageSchema = z
  .instanceof(Blob)
  .nullable()
  .optional()
  .refine(
    (file) => {
      if (!file) {
        return true;
      }
      return file.size <= 5 * 1024 * 1024;
    },
    {
      message: "File size should be less than 5MB",
    },
  )
  .refine(
    (file) => {
      if (!file) {
        return true;
      }
      return ["image/jpeg", "image/jpeg", "image/png"].includes(file.type);
    },
    {
      message: "Only JPEG and PDF files are allowed",
    },
  );
