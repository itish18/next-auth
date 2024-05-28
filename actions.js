"use server";

import bcrypt, { hash } from "bcryptjs";

import { loginFormSchema, registerFormSchema } from "@/schema";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn } from "./auth";
import { AuthError } from "next-auth";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "./lib/tokens";
import { sendVerificationEmail } from "./lib/mail";
import { getVerificationTokenBytoken } from "./data/verification-token";
import { resetFormSchema } from "@/schema";
import { getPasswordTokenByToken } from "./data/password-reset-token";

export const login = async (values) => {
  const validatedValues = loginFormSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid credentials" };
  }

  const { email, password } = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/settings",
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw e;
  }
};

export const register = async (values) => {
  const validatedValues = registerFormSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid credentials" };
  }

  const { name, email, password } = validatedValues.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already exist" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // send verification token
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent" };
  } catch (e) {
    return { error: "Something went wrong" };
  }
};

export const newVerification = async (token) => {
  const existingToken = await getVerificationTokenBytoken(token);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  //revalidate to login instead of showing success message

  return { success: "Email verified" };
};

export const reset = async (values) => {
  const validatedValues = resetFormSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedValues.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email sent" };
};

export const newPassword = async (values, token) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedValues = newPasswordSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid password" };
  }

  const { password } = validatedValues.data;

  const existingToken = await getPasswordTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password changed" };
};
