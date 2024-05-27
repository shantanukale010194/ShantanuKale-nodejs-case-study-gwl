import { IsBase64, IsDate, IsDateString, IsEnum, IsString } from "class-validator"
import { TaskStatus } from "../enums/task.enum";

export class CreateTaskValidator {
  @IsString()
  title!: string;
  @IsString()
  description!: string;
  @IsDateString()
  duedate!: Date;
  @IsEnum(TaskStatus)
  status!: TaskStatus
}
export class UpdateTaskValidator {
  @IsString()
  taskid!: string;
  @IsString()
  title!: string;
  @IsString()
  description!: string;
  @IsDateString()
  duedate!: Date;
  @IsEnum(TaskStatus)
  status!: TaskStatus
}

export class DeleteTaskValidator {
  @IsString()
  taskid!: string;
 }
 
 export class AuthValidator {
  @IsString()
  username!: string;
 }