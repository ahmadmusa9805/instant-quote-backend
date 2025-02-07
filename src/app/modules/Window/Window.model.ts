import { Schema, model } from 'mongoose';
      import { TWindow, WindowModel } from './Window.interface';
      
      const WindowSchema = new Schema<TWindow, WindowModel>({
        windowSquareMeters: { type: Number, required: true },
        price: { type: Number, required: true },  
        info: { type: String},
        isDeleted: { type: Boolean, default: false },
      });
      
      WindowSchema.statics.isWindowExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Window = model<TWindow, WindowModel>('Window', WindowSchema);
      