import { Schema, model } from 'mongoose';
      import { TComment, CommentModel } from './comment.interface';
   
      const commentSchema = new Schema<TComment, CommentModel>({
        userId: {
          type: Schema.Types.ObjectId,
          required: [true, 'User id is required'],
          ref: 'User',
        },
        blogId: {
          type: Schema.Types.ObjectId,
          required: [true, 'Blog id is required'],
          ref: 'Blog',
        },
        text: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      commentSchema.statics.isCommentExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Comment = model<TComment, CommentModel>('Comment', commentSchema);
      