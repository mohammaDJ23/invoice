import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { createInvoiceOperation } from "../lib/api/create-invoice";
import { invoiceValidations } from "../lib/validation/invoice-validations";
import { HttpError } from "../lib/models/error";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      throw new HttpError("Request failed", 500);
    }

    const userSession = await getSession({ req });

    if (!userSession) {
      throw new HttpError("Not authenticated.", 401);
    }

    if (!req.body) {
      throw new HttpError("Invalid input", 422);
    }

    const isValid = invoiceValidations(req.body);

    if (!isValid) {
      throw new HttpError("Invalid input", 422);
    }

    const { name } = await createInvoiceOperation(req, userSession);

    res.status(201).send({ data: `${name}'s invoice was registered` });
  } catch (error) {
    res.status(error.code || 500).send({ error: error.message });
  }
};
