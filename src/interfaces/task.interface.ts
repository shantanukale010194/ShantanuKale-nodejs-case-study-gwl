import { TaskStatus } from "../enums/task.enum";

export interface TaskInterface {
  taskid: string;
  title: string;
  description: string;
  duedate: Date;
  status: TaskStatus
}
