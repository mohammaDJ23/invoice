import mongoose from "mongoose";

import { getDatabase } from "../../databasee-connection";
import Invoice from "../../models/invoice";

export const invoicesReportOperation = async (userId: string) => {
  const db = await getDatabase();

  const invoices = await Invoice.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId)
      }
    },

    {
      $project: {
        _id: 0,

        id: {
          $toString: "$_id"
        },

        invoiceInfo: "$invoiceInfo",
        subTotal: "$subTotal",
        tax: "$tax",
        total: "$total",
        products: "$products",

        createdAt: {
          $toString: "$createdAt"
        }
      }
    },

    {
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "products"
      }
    },

    { $unwind: "$products" },

    {
      $project: {
        id: 1,
        invoiceInfo: 1,
        subTotal: 1,
        tax: 1,
        total: 1,
        products: "$products.products",
        createdAt: 1
      }
    },

    {
      $sort: {
        createdAt: -1
      }
    }
  ]);

  return { invoicesReport: invoices };
};
