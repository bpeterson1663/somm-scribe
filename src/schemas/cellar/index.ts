import { ImageSchema } from "@/schemas/image";
import { z } from "zod";

const VintageSchema = z
  .union([
    z.string().regex(/^\d{4}$/, {
      message: "Enter the vintage of the wine (NV for non vintage)",
    }),
    z.literal("NV", {
      errorMap: () => ({ message: "Enter the vintage of the wine (NV for non vintage)" }),
    }),
    z.literal("nv", {
      errorMap: () => ({ message: "Enter the vintage of the wine (NV for non vintage)" }),
    }),
  ])
  .default("");

export const WineSchema = z.object({
  id: z.string().default(""),
  type: z.string().default("wine"),
  accountId: z.string().default(""),
  date: z.date().default(new Date()),
  producer: z.string().min(1, { message: "Enter the producer of the wine" }),
  classification: z.string().default("").nullable(),
  varietal: z.array(z.string()).min(1, { message: "Enter at least one varietal" }),
  subregion: z.string().default("").nullable(),
  region: z.string().min(1, { message: "Enter the region the wine is from" }),
  country: z.string().min(1, { message: "Enter the country where the wine is from" }),
  vintage: VintageSchema,
  quantity: z.number().default(0).nullable(),
  price: z.number().default(0).nullable(),
  description: z.string().default("").nullable(),
  labelUri: z.string().default("").nullable(),
  imageBlob: ImageSchema,
});

export type WineT = z.infer<typeof WineSchema>;

export const INITIAL_VALUES: WineT = {
  type: "wine",
  id: "",
  accountId: "",
  producer: "",
  classification: "",
  subregion: "",
  region: "",
  country: "",
  vintage: "",
  quantity: 0,
  price: 0,
  description: "",
  labelUri: "",
  varietal: [],
  date: new Date(),
  imageBlob: null,
};
