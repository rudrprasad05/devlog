import { z } from "zod";

export const NewCategoryForm = z.object({
  name: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  imageUrl: z.string(),
});

export type NewCategoryType = z.infer<typeof NewCategoryForm>;
