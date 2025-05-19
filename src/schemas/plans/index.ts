import { z } from "zod";

export const PlanSchema = z.object({
  id: z.string().default(""),
  name: z.string().default(""),
  price: z.number().default(0),
  // maxWine: z.number().nullable().default(0),
  // maxTasting: z.number().nullable().default(0),
  description: z.string().default(""),
  isDefault: z.boolean().default(true)
  // upgradablePlans: z.array(z.string()).default([]),
  // downgradablePlans: z.array(z.string()).default([]),
  // isActive: z.boolean().default(false),
  // trialLength: z.number().default(0),
});

export type PlanT = z.infer<typeof PlanSchema>;

export const INITIAL_VALUES: PlanT = {
  id: "",
  name: "",
  price: 0,
  // maxWine: 0,
  // maxTasting: 0,
  description: "",
  isDefault: true,
  // upgradablePlans: [],
  // downgradablePlans: [],
  // isActive: false,
  // trialLength: 0,
};