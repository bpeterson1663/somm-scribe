import { z } from "zod";

export const TagSchema = z.object({
  id: z.string().default(""),
  name: z.string().default(""),
  category: z.string().default(""),
});

export type TagT = z.infer<typeof TagSchema>;

export const INITIAL_VALUES: TagT = {
  id: "",
  name: "",
  category: "",
};
