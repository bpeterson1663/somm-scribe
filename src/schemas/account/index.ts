import { ImageSchema } from "@/schemas/image";
import { z } from "zod";

export const AccountSchema = z.object({
  id: z.string().default(""),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  avatar: z.string().default(""),
  displayName: z.string().default(""),
  authId: z.string().default(""),
  email: z.string().email({ message: "Not a valid email" }),
  imageBlob: ImageSchema,
  planId: z.string().default(""),
});

export const defaultAccount = {
  id: "",
  firstName: "",
  lastName: "",
  avatar: "",
  displayName: "",
  authId: "",
  email: "",
  imageBlob: null,
  planId: "",
};

export type AccountT = z.infer<typeof AccountSchema>;
