import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Enter a Valid Email" }),
  password: z.string(),
});

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Enter a Valid Email" }),
    name: z
      .string()
      .min(2, { message: "Should have more than 2 characters" })
      .max(50, { message: "Should have less than 50 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must contain more than 2 characters" })
      .max(32, { message: "Password must have less than 2 characters" }),
    confirmPassword: z.string(),
    role: z
      .string()
      .min(2, { message: "Should have more than 2 characters" })
      .max(50, { message: "Should have less than 50 characters" })
      .default("user"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmpassword"],
  });

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type LoginFormType = z.infer<typeof LoginFormSchema>;
