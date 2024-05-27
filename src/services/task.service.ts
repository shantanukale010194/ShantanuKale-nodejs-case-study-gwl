import { BaseService } from "./base.service";
import { Request, Response } from 'express';
import { TaskSchema } from "../models";
import { v4 as uuidv4 } from 'uuid';
import { TaskInterface } from "../interfaces/task.interface";

export class TaskService extends BaseService {
  constructor() {
    super();
  }
  
  /**
   * insert task details service
   * @param req 
   * @param res 
   */
  public async insertTaskDetails(req: Request, res: Response) {
    try {
      const { title, description, duedate, status }: TaskInterface = req.body;
      const taskid : string = uuidv4();
      const response = await TaskSchema.create({
        taskid: taskid,
        title: title,
        description: description,
        duedate: duedate,
        status: status
      });

      res.status(200).json({
        error: false,
        statusCode: 200,
        message: 'Task Created Successfully',
        taskid: taskid 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  }
  /**
   * get task details by id service
   * @param req 
   * @param res 
   */
  public async getTaskDetailsById(req: Request, res: Response) {
    try {
      const taskId = req.params.id;

      const response = await TaskSchema.findOne({taskid:taskId});

      if (!response) {
        return res.status(404).json({
          error: true,
          statusCode: 404,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        error: false,
        statusCode: 200,
        data: response
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  }

  /**
   * get all task service
   * @param req 
   * @param res 
   */
  public async getAllTaskDetails(req: Request, res: Response) {
    try {
      const response = await TaskSchema.find();

      res.status(200).json({
        error: false,
        statusCode: 200,
        data: response
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  }

  /**
   * update Task Details
   * @param req 
   * @param res 
   * @returns 
   */
  public async updateTaskDetails(req: Request, res: Response) {
    try {
      const { taskid, title, description, duedate, status }: TaskInterface = req.body;


      const response = await TaskSchema.findOneAndUpdate(
        { taskid: taskid },
        {
          title,
          description,
          duedate,
          status
        },
        { new: true }  // This option returns the updated document
      );

      if (!response) {
        return res.status(404).json({
          error: true,
          statusCode: 404,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        error: false,
        statusCode: 200,
        message: 'Task Updated Successfully'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  }
 
  /**
   * Delete task service
   * @param req 
   * @param res 
   * @returns 
   */
  public async deleteTaskDetails(req: Request, res: Response) {
    try {
      const taskId = req.body;
      const response = await TaskSchema.deleteOne(taskId);

      if (!response) {
        return res.status(404).json({
          error: true,
          statusCode: 404,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        error: false,
        statusCode: 200,
        message: 'Task Deleted Successfully'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  }
}
