import mongoose, { Schema, Document } from "mongoose";

interface IAuthor {
  // id: string; 
  name: string;
  email: string;
}

interface IBlog extends Document {
  title: string;
  content: string;
  author: IAuthor;
  isPublished: Boolean;
}



const AuthorSchema = new Schema<IAuthor>({
  // id: { type: String, required: true }, // Include author ID
  name: { type: String, required: true },
  email: { type: String, required: true },
});



const BlogSchema = new mongoose.Schema(
  {
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
    author: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    }
  }, 
  
  {
  timestamps:true
  }
);






export const BlogModel = mongoose.model<IBlog>("Blog", BlogSchema);






