import { z } from "zod";
export const Schema = z
  .object({
    name: z.string().min(1, { message: "Enter your name" }),
    email: z.string().email({ message: "Not a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
        message: "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    },
  );

export type SignUpFormT = z.infer<typeof Schema>;
