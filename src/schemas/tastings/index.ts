import { z } from "zod";
import { ImageSchema } from "@/schemas/image";
import { INITIAL_REGION_VALUES, RegionSchema } from "../regions";
import { TagSchema } from "../tags";
import { VarietalSchema } from "../varietals";

export const TastingTSchema = z.object({
  id: z.string().default(""),
  accountId: z.string().default(""),
  name: z.string().default(""),
  region: z.string().nonempty("Region is required"),
  date: z.date().default(new Date()),
  notes: z.string().default(""),
  imageUrl: z.string().default(""),
  imageBlob: ImageSchema,
  tags: z.array(z.string()).default([]),
  varietals: z.array(z.string()).default([]),
  rating: z.number().default(0),
  purchaseLocation: z.string().default(""),
  price: z.number().default(0),
  wouldBuyAgain: z.boolean().default(false)
});

export type TastingT = z.infer<typeof TastingTSchema>;

export const INITIAL_FORM_VALUES: TastingT = {
  id: "",
  accountId: "",
  name: "",
  region: "",
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

export const TastingEnrichedSchema = z.object({
  id: z.string().default(""),
  accountId: z.string().default(""),
  name: z.string().default(""),
  region: RegionSchema,
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

export type TastingEnrichedT = z.infer<typeof TastingEnrichedSchema>;

export const INITIAL_ENRICHED_VALUES: TastingEnrichedT = {
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