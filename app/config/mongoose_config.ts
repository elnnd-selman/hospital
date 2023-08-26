import mongoose, { ConnectOptions } from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export async function closeDB() {
  try {
    await mongoose.connection.close();
    console.log("Close Connected MongoDB");
  } catch (error) {
    console.error("Error Close Connected MongoDB:", error);
  }
}
