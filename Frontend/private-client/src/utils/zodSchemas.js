import * as z from "zod";
import sanitizeField from "./sanitize";

const postSchema = z.object({
  tag: z
    .string()
    .min(2, "Tag must be at least 2 characters")
    .transform(sanitizeField),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .transform(sanitizeField),
  content: z
    .string()
    .min(2, "Content must be at least 10 characters")
    .transform(sanitizeField),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "At least one file is required",
    })
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
      { message: "Each file must not exceed 5MB" },
    )
    .optional(),
  isPublished: z.boolean().optional(),
});

const loginSchema = z.object({
  email: z.string().max(255).email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const signUpSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z
      .string()
      .min(2, "Email must be at least")
      .max(255)
      .email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export { postSchema, loginSchema, signUpSchema };