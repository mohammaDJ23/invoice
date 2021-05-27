import mongoose from "mongoose";

export const getDatabase = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};
