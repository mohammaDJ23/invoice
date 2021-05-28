import mongoose from "mongoose";

import { getDatabase } from "../../databasee-connection";
import Invoice from "../../models/invoice";

export const getInvoiceNumber = async (id: string) => {
  const db = await getDatabase();

  const [count] = await Invoice.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(id)
      }
    },

    {
      $count: "invoiceNumber"
    }
  ]);

  return { invoiceNumber: count?.invoiceNumber + 1 || 0 };
};
