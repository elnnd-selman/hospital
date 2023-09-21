import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface PatientDocument extends Document {
  name: string;
  code: string;
  age: number;
  phone: string;
  gender: string;
  pendingTest: any[];
  doneTest: any[];
}

const patientSchema = new Schema<PatientDocument>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: false },
    phone: { type: String, required: false },
    gender: { type: String, required: true },
    pendingTest: [
      {
        type: mongoose.SchemaTypes.Mixed,
      },
    ],
    doneTest: [
      {
        type: mongoose.SchemaTypes.Mixed,
      },
    ],
  },
  { timestamps: true }
);



patientSchema.plugin(mongoosePaginate);

const patientModel =
  mongoose.models.patient || mongoose.model<Document>("patient", patientSchema);

export default patientModel;
