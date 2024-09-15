import { WineSchema } from "@/schemas/cellar";
import { z } from "zod";

export const RedHueSchema = z.enum(["purple", "ruby", "garnet", "tawny", "brown"]);
export type RedHueT = z.infer<typeof RedHueSchema>;

export const WhiteHueSchema = z.enum(["straw", "yellow", "gold", "amber", "brown"]);
export type WhiteHueT = z.infer<typeof WhiteHueSchema>;

export const RoseHueSchema = z.enum(["pink", "salmon", "copper"]);
export type RoseHueT = z.infer<typeof RoseHueSchema>;

export const HueSchema = z.enum([...RedHueSchema.options, ...WhiteHueSchema.options, ...RoseHueSchema.options]);

export const ColorSchema = z.enum(["red", "white", "rose"]);
export type ColorT = z.infer<typeof ColorSchema>;

export const IntesnitySchema = z.enum(["pale", "medium", "deep"]);
export type IntensityT = z.infer<typeof IntesnitySchema>;

export const TastingSchema = WineSchema.extend({
  hue: HueSchema,
  color: ColorSchema,
  intensity: IntesnitySchema,
  smell: z.string().min(1, { message: "Describe how the wine smells" }),
  alcohol: z.number().min(1).max(5).default(1),
  acidity: z.number().min(1).max(5).default(1),
  tannin: z.number().min(1).max(5).default(1),
  sweet: z.number().min(1).max(5).default(1),
  body: z.number().min(1).max(5).default(1),
  rating: z.number().min(1).max(5).default(3),
  remarks: z.string().default(""),
});

export type TastingT = z.infer<typeof TastingSchema>;

export const INITIAL_VALUES: TastingT = {
  id: "",
  type: "tasting",
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
  hue: "purple",
  color: "red",
  intensity: "pale",
  smell: "",
  alcohol: 1,
  acidity: 1,
  tannin: 1,
  sweet: 1,
  body: 1,
  rating: 3,
  remarks: "",
  imageBlob: null,
};
