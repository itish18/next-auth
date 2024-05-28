import { db } from "@/lib/db";

export const getVerificationTokenBytoken = async (token) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (e) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (e) {
    return null;
  }
};
