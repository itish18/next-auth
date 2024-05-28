import { db } from "@/lib/db";

export const getPasswordTokenByToken = async (token) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return passwordResetToken;
  } catch (e) {
    return null;
  }
};

export const getPasswordTokenByEmail = async (email) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passwordResetToken;
  } catch (e) {
    return null;
  }
};
