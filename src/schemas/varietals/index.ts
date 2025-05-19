
import { z } from "zod";

export const VarietalSchema = z.object({
  id: z.string().default(""),
  name: z.string().default(""),
  description: z.string().default(""),
  characteristics: z.array(z.string()).default([]),
  recommendedPairings: z.array(z.string()).default([]),
  color: z.string().default("")
});

export type VarietalT = z.infer<typeof VarietalSchema>;

export const INITIAL_VALUES: VarietalT = {
  id: "",
  name: "",
  description: "",
  characteristics: [],
  recommendedPairings: [],
  color: "",
};
