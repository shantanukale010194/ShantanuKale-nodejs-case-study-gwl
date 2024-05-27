import mongoose, { Schema, Document } from 'mongoose';

const taskSchema: Schema = new Schema({
  taskid: {type: String, rquired: true},
  title: {type: String, required: true },
  description: {type: String, required: true },
  duedate: {type: Date, required: true },
  status: {type: String, required: true }
}, {timestamps: true });


export const TaskSchema = mongoose.model('taskmodel', taskSchema);

