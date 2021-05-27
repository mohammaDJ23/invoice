import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { getDatabase } from "../lib/databasee-connection";
import { AuthDataOptions } from "../lib/types";
import { authValidations } from "../lib/validation/auth-validations";
import { HttpError } from "../lib/models/error";
import User from "../lib/models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      throw new HttpError("Request failed", 500);
    }

    if (!req.body) {
      throw new HttpError("Invalid input", 422);
    }

    const isValid = authValidations(req.body as AuthDataOptions);

    if (!isValid) {
      throw new HttpError("Invalid input", 422);
    }

    const { name, email, password } = req.body as AuthDataOptions;

    const db = await getDatabase();

    const findedEmail = await User.findOne({ email: email.toString() });

    if (findedEmail) {
      throw new HttpError("The user already exist.", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      invoices: []
    });

    await user.save();

    res.status(201).send({ data: "The operation was successful" });
  } catch (error) {
    res.status(error.code || 500).send({ error: error.message });
  }
};
