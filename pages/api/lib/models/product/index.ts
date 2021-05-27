import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    invoice: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      required: true
    },

    products: [
      {
        title: {
          type: String,
          required: true
        },

        description: {
          type: String,
          required: true
        },

        price: {
          type: Number,
          required: true
        },

        quantity: {
          type: Number,
          required: true
        },

        total: {
          type: Number,
          required: true
        }
      }
    ]
  },

  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
