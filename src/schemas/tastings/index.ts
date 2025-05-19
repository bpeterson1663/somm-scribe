import { z } from "zod";
import { ImageSchema } from "../image";
import { VarietalSchema } from "@/schemas/varietals";
import { TagSchema } from "@/schemas/tags";
import { RegionSchema, INITIAL_REGION_VALUES } from "@/schemas/regions";

export const TastingSchema = z.object({
  id: z.string().default(""),
  accountId: z.string().default(""),
  name: z.string().default(""),
  region: RegionSchema.default(INITIAL_REGION_VALUES),
  date: z.date().default(new Date()),
  notes: z.string().default(""),
  imageUrl: z.string().default(""),
  imageBlob: ImageSchema,
  tags: z.array(TagSchema).default([]),
  varietals: z.array(VarietalSchema).default([]),
  rating: z.number().default(0),
  purchaseLocation: z.string().default(""),
  price: z.number().default(0),
  wouldBuyAgain: z.boolean().default(false)
});

export type TastingT = z.infer<typeof TastingSchema>;

export const INITIAL_VALUES: TastingT = {
  id: "",
  accountId: "",
  name: "",
  region: INITIAL_REGION_VALUES,
  price: 0,
  imageUrl: "",
  varietals: [],
  date: new Date(),
  rating: 3,
  notes: "",
  tags: [],
  wouldBuyAgain: false,
  purchaseLocation: ""
};
