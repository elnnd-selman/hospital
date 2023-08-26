import mongoose, { Document, Mongoose, ObjectId, Schema, SchemaDefinitionProperty } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
export interface DepartmentDocumentModel extends Document {
  name: string;
  children: [String?];
  user: SchemaDefinitionProperty<ObjectId>;
}

const DepartmentSchema = new Schema<DepartmentDocumentModel>(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    children: [],
  },
  { timestamps: true }
);
DepartmentSchema.plugin(mongoosePaginate);




// create the paginated model
const DepartmentModelPaginate =
  (mongoose.models.department as mongoose.PaginateModel<DepartmentDocumentModel>) ||
  mongoose.model<DepartmentDocumentModel>("department", DepartmentSchema);

export default DepartmentModelPaginate;
