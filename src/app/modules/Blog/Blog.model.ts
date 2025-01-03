import { Schema, model } from 'mongoose';
      import { TBlog, BlogModel } from './Blog.interface';
      
      const BlogSchema = new Schema<TBlog, BlogModel>({
        title: { type: String, required: true },
        description: { type: String, required: true },
        img: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      BlogSchema.statics.isBlogExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Blog = model<TBlog, BlogModel>('Blog', BlogSchema);
      