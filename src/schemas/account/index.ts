import { z } from "zod";

export const AccountSchema = z.object({
  id: z.string().default(""),
  name: z.string().min(1, { message: "Name is required" }),
  authId: z.string().default(""),
  email: z.string().email({ message: "Not a valid email" }),
  planId: z.string().default(""),
  onboardingComplete: z.boolean().default(false)
});

export const defaultAccount = {
  id: "",
  name: "",
  authId: "",
  email: "",
  planId: "",
  onboardingComplete: false
};

export type AccountT = z.infer<typeof AccountSchema>;
