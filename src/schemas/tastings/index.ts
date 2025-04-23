import { z } from "zod";
import { ImageSchema } from "../image";

export const TastingSchema = z.object({
  id: z.string().default(""),
  accountId: z.string().default(""),
  name: z.string().default(""),
  region: z.string().default(""),
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

export type TastingT = z.infer<typeof TastingSchema>;

export const INITIAL_VALUES: TastingT = {
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
