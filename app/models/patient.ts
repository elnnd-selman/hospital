import mongoose, { Document, Schema, Model } from "mongoose";
import mongoosePaginate  from "mongoose-paginate-v2";

// Define pagination result type
interface PaginationResult<T extends Document> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Extend mongoose's Model to include the paginate method
interface PaginatedModel<T extends Document> extends Model<T> {
  paginate(
    query?: any,
    options?: any,
    callback?: (err: any, result: PaginationResult<T>) => void
  ): Promise<PaginationResult<T>>;
}

export interface PatientDocument extends Document {
  name: string;
  code: string;
  age: string;
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
    age: { type: String, required: false },

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

const patientModel = (mongoose.models.patient as PaginatedModel<PatientDocument>) || mongoose.model<PatientDocument>("patient", patientSchema);

export default patientModel;