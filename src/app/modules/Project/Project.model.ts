import { Schema, model } from 'mongoose';
      import { TProject, ProjectModel } from './Project.interface';

      const ProjectSchema = new Schema<TProject, ProjectModel>({
        title: { type: String, required: true },
        description: { type: String, required: true },
        img: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      ProjectSchema.statics.isProjectExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Project = model<TProject, ProjectModel>('Project', ProjectSchema);
      