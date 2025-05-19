import { z } from "zod";

export const RegionSchema = z.object({
  id: z.string().default(""),
  name: z.string().default(""),
  country: z.string().default(""),
  description: z.string().default(""),
});

export type RegionT = z.infer<typeof RegionSchema>;

export const INITIAL_REGION_VALUES: RegionT = {
  id: "",
  name: "",
  country: "",
  description: ""
};
