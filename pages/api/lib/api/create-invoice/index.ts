import { NextApiRequest } from "next";
import mongoose from "mongoose";

import { getDatabase } from "../../databasee-connection";
import { InvoiceDataOptions } from "../../types";
import Invoice from "../../models/invoice";
import Product from "../../models/product";
import User from "../../models/user";
import { HttpError } from "../../models/error";
import { getInvoiceNumber } from "../invoice-number";

export const createInvoiceOperation = async (
  req: NextApiRequest,
  userSession: any
) => {
  const {
    products,
    invoice: { name, email, address },
    subTotal,
    tax,
    total
  }: InvoiceDataOptions = req.body;

  const invoice = {
    invoiceInfo: {
      name,
      email,
      address
    },

    products: [],
    user: "",
    subTotal,
    tax,
    total
  };

  const db = await getDatabase();
  const session = await db.startSession();

  const user = await User.findById({
    _id: mongoose.Types.ObjectId(userSession.user.id)
  });

  if (!user) {
    throw new HttpError("Could not found any user.", 403);
  }

  await session.withTransaction(async () => {
    const createdInvoice = new Invoice(invoice);
    const createdProduct = new Product({ products });

    user.invoices.push(createdInvoice._id);
    createdInvoice.user = user._id;
    createdInvoice.products = createdProduct._id;
    createdProduct.invoice = createdInvoice._id;

    await createdInvoice.save({ session });
    await createdProduct.save({ session });
    await user.save({ session });
  });

  session.endSession();

  const { invoiceNumber } = await getInvoiceNumber(userSession.user.id);

  return { name, invoiceNumber };
};
