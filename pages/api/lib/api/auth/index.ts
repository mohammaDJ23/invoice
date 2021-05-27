import bcrypt from "bcryptjs";

import { getDatabase } from "../../databasee-connection";
import User from "../../models/user";
import { HttpError } from "../../models/error";

export const authOperation = async (
  credentials: Record<"email" | "password", string>
) => {
  const db = await getDatabase();

  const findedUser = await User.findOne({
    email: credentials.email.toString()
  });

  if (!findedUser) {
    throw new HttpError("Email is Incorrect.", 422);
  }

  const decodedPassword = await bcrypt.compare(
    credentials.password.toString(),
    findedUser.password
  );

  if (!decodedPassword) {
    throw new HttpError("Password is Incorrect.", 422);
  }

  return {
    id: findedUser._id.toString(),
    email: findedUser.email
  };
};
