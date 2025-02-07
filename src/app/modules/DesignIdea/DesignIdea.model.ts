import { Schema, model } from 'mongoose';
      import { TDesignIdea, DesignIdeaModel } from './DesignIdea.interface';
      
      const DesignIdeaSchema = new Schema<TDesignIdea, DesignIdeaModel>({
        clarity: { type: String, required: true },
        info: { type: String},
        isDeleted: { type: Boolean, default: false },
      });
      
      DesignIdeaSchema.statics.isDesignIdeaExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const DesignIdea = model<TDesignIdea, DesignIdeaModel>('DesignIdea', DesignIdeaSchema);
      