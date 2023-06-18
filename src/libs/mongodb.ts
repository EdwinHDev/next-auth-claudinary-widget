import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("Al parecer no existe MONGODB_URI");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      console.log("Conectados a mongodb");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(false);
  }
}