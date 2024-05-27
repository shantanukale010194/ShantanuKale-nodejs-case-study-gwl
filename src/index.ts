import express from 'express'
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { TaskController } from './controllers';
import { TaskService } from './services';
import mongoose from 'mongoose';
import { Auth } from './auth';

dotenv.config(); 
//Connecting mongoose to mongodb

//const monogodbConnectionString: string = process.env.MONGO_CONN; 
 const monogodbConnectionString: string = 'mongodb+srv://shantanukale436:WK7W9Q9BfSD7B9Su@cluster0.j8sxiu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(monogodbConnectionString,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}).then(() => {
  console.log('Mongodb connected sucessfully')
}).catch((error) => {
console.log(error);
})

//initialize listening port 
const PORT = process.env.PORT || 3000;

//creating express app instance 
const app = express();
app.use(express.json());


//setup Routes
const taskService = new TaskService;
const authService = new Auth();
const taskController = new TaskController(taskService, authService);
app.use('/galaxyweblinks', taskController.getRoutes());

// Call getAccessTokenForAPI to set up the route
taskController.getAcessTokenForAPI();

app.listen((PORT), () => {
 console.log(`Server Listening on ${PORT}  ${new Date().getTime()}`);
});


