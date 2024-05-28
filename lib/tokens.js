import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import { getPasswordTokenByEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async (email) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exisitingToken = await getVerificationTokenByEmail(email);

  if (exisitingToken) {
    await db.verificationToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async () => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exisitingToken = await getPasswordTokenByEmail(email);

  if (exisitingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
