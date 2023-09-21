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
  department: SchemaDefinitionProperty<ObjectId>;
  parentId: SchemaDefinitionProperty<ObjectId>;

  testId: SchemaDefinitionProperty<ObjectId>;
}

const SubTestSchema = new Schema<TestDocumentModel>(
  {
    name: { type: String, required: true },
    parentId: { type: mongoose.Types.ObjectId, required: false },
    testId: { type: mongoose.Types.ObjectId, required: true },

    type: {
      type: String,
      required: true,
      enum: ["normalRange", "text", "keyAndValue", "select", "parent"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    data: mongoose.SchemaTypes.Mixed,
  },
  { timestamps: true }
);
SubTestSchema.plugin(mongoosePaginate);

// const TestModel =
//   mongoose.models.Test ||
//   mongoose.model<TestDocumentModel>("Test", SubTestSchema);

// create the paginated model
const SubTestModelPaginate =
  (mongoose.models.SubTest as mongoose.PaginateModel<TestDocumentModel>) ||
  mongoose.model<TestDocumentModel>("SubTest", SubTestSchema);

export default SubTestModelPaginate;
