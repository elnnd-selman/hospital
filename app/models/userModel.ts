import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "department", "superAdmin", "print", "reception"],
      default: "user",
    },
    permissions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const userModel =
  mongoose.models.user || mongoose.model<Document>("user", userSchema);

export default userModel;
