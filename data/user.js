import { db } from "@/lib/db";

export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (e) {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (e) {
    return null;
  }
};
