import { z } from "zod";

export const Schema = z.object({
  email: z.string().email({ message: "Not a valid email" }),
  password: z.string().min(8, { message: "Password should be at least 8 characters" }),
});

export type SignInFormT = z.infer<typeof Schema>;
