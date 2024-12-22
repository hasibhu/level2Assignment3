
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandle from './app/middleware/globalErrorHandler';

// import router from './app/routes';



const app: Application = express();

app.use(express.json());
app.use(cors());


// application routes
app.use('/', router)






const getAController = (req: Request, res: Response) => {
  const a = 200;

  res.sendStatus(a);
}

app.get('/', getAController);



// error handler 

app.use(globalErrorHandle) // not call, just use 


//not route found error handler

// app.use(notfound)



export default app;
