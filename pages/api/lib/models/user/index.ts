import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    invoices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
        required: true
      }
    ]
  },

  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
