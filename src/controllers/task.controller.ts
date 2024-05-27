import express, { Router, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { TaskService } from '../services/task.service';
import { AuthValidator, CreateTaskValidator, DeleteTaskValidator } from '../validators';
import { validateRequest } from '../middlewears';
import { Auth } from '../auth'; 

export class TaskController extends BaseController {
  private router: Router;

  constructor(private taskService: TaskService, private auth: Auth) {
    super();
    this.router = express.Router();
    this.setupRoutes();
    this.getAcessTokenForAPI();
  }
  public async getAcessTokenForAPI() {
    try {
      /**
       * Route for generating access token
       */
      this.router.post('/auth/token', validateRequest(AuthValidator), async (req: Request, res: Response) => {
        try {
          // Generate access token with some random data (for demonstration)
          const accessToken = await this.auth.createAccessToken(req.body);
  
          // Return the access token in the response
          res.status(200).json({ accessToken });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            error: true,
            statusCode: 500,
            message: 'INTERNAL SERVER ERROR'
          });
        }
      });
  
      return this.router;
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: 'INTERNAL SERVER ERROR'
      }
    }
  }
  
  public async setupRoutes() {
    try {

      /**
       * Route for create task 
       */
      await this.router.post('/task', this.auth.authenticateToken, validateRequest(CreateTaskValidator), this.taskService.insertTaskDetails.bind(this));

      /**
       * Route for get Task by id
       */
      await this.router.get('/task/:id', this.auth.authenticateToken, this.taskService.getTaskDetailsById.bind(this));

      /**
       * Route for get all task
       */
      await this.router.get('/alltasks', this.auth.authenticateToken, this.taskService.getAllTaskDetails);

      /**
       * Route for update task details
       */
      await this.router.put('/task', this.auth.authenticateToken, validateRequest(CreateTaskValidator), this.taskService.updateTaskDetails.bind(this));

      /**
       * Route for delete task
       */
      await this.router.delete('/task', this.auth.authenticateToken, validateRequest(DeleteTaskValidator), this.taskService.deleteTaskDetails.bind(this));

      return this.router;
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: 'INTERNAL SERVER ERROR'
      }
    }
  }

  public getRoutes(): Router {
    return this.router;
  }

  public async getAccessToken(req: Request, res: Response) {
    try {
      // Generate access token with some random data (for demonstration)
      const accessToken = await this.auth.createAccessToken( req.body );

      // Return the access token in the response
      res.status(200).json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        statusCode: 500,
        message: 'INTERNAL SERVER ERROR'
      });
    }
  }
}
