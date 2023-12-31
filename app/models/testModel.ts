import mongoose, {
  Document,
  Mongoose,
  ObjectId,
  Schema,
  SchemaDefinitionProperty,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
export interface TestDocumentModel extends Document {
  name: string;
  children: [String?];
  user: SchemaDefinitionProperty<ObjectId>;
  type: string;
  data: any;
  parentId: SchemaDefinitionProperty<ObjectId>;
}

const TestSchema = new Schema<TestDocumentModel>(
  {
    name: { type: String, required: true },
    parentId: { type: mongoose.Types.ObjectId, required: false },
    type: {
      type: String,
      required: true,
      enum: ["normalRange", "text", "keyAndValue", "select", "parent"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: false,
    },
    data: mongoose.SchemaTypes.Mixed,
  },
  { timestamps: true }
);
TestSchema.plugin(mongoosePaginate);

// const TestModel =
//   mongoose.models.Test ||
//   mongoose.model<TestDocumentModel>("Test", TestSchema);

// create the paginated model
const TestModelPaginate =
  (mongoose.models.Test as mongoose.PaginateModel<TestDocumentModel>) ||
  mongoose.model<TestDocumentModel>("Test", TestSchema);

export default TestModelPaginate;
