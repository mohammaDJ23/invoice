import mongoose from "mongoose";

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    invoiceInfo: {
      name: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true
      },

      address: {
        type: String,
        required: true
      }
    },

    subTotal: {
      type: Number,
      required: true
    },

    tax: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    products: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  },

  { timestamps: true }
);

export default mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
