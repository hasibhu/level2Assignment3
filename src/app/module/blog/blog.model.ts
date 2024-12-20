import mongoose, { Schema, Document } from "mongoose";

interface IAuthor {
  name: string;
  email: string;
}

interface IBlog extends Document {
  title: string;
  content: string;
  author: IAuthor;
}

const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: AuthorSchema, required: true },
},
  {
  timestamps:true
});

export const BlogModel = mongoose.model<IBlog>("Blog", BlogSchema);


