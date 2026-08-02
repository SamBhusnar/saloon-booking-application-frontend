import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),

  password: z.string().trim().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is mandatory")
      .max(50, "First name is too long"),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is mandatory")
      .max(50, "Last name is too long"),

    username: z
      .string()
      .trim()
      .min(1, "Username is mandatory")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can contain only letters, numbers and underscore",
      ),

    email: z
      .string()
      .trim()
      .min(1, "Email is mandatory")
      .email("Invalid email format"),

    phone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Phone number must contain exactly 10 digits"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password must contain uppercase, lowercase, digit and special character",
      ),

    confirmPassword: z.string().min(1, "Confirm password is mandatory"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
