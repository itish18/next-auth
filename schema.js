import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({
      invalid_type_error: "Invalid email address",
    })
    .min(1, {
      message: "Enter email address",
    }),
  password: z.string().min(1, {
    message: "Password can't be empty",
  }),
});

export const registerFormSchema = z.object({
  name: z.string().min(1, { message: "Name can't be empty" }),
  email: z
    .string()
    .email({
      invalid_type_error: "Invalid email address",
    })
    .min(1, {
      message: "Enter email address",
    }),
  password: z.string().min(6, {
    message: "Length of password should be 6 characters long",
  }),
});

export const resetFormSchema = z.object({
  email: z
    .string()
    .email({
      invalid_type_error: "Invalid email address",
    })
    .min(1, {
      message: "Enter email address",
    }),
});

export const newPasswordSchema = z.object({
  email: z.string().password().min(6, {
    message: "Minimum of 6 characters required",
  }),
});
