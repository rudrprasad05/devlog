import { z } from "zod";

export const NewPostForm = z.object({
  name: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  category: z.string(),
  imageUrl: z
    .string()
    .min(1, { message: "Press Upload before submitting the form" })
    .optional(),
  authorId: z
    .string()
    .min(1, { message: "Press Upload before submitting the form" })
    .optional(),
});

export type NewPostType = z.infer<typeof NewPostForm>;
