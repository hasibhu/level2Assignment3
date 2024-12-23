
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandle from './app/middleware/globalErrorHandler';
import notFound from './app/errors/notFound';


// import router from './app/routes';



const app: Application = express();

app.use(express.json());
app.use(cors());


// application routes
app.use('/', router)






// const getAController = (req: Request, res: Response) => {
//   const a = 200;

//   res.sendStatus(a);
// }

// app.get('/', getAController);


app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Blog Management API</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .heading {
          margin: 0;
          height: 40vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          text-align: center;
        }

        .description {
          margin: 0;
          display: flex;
          flex-direction: column; /* Ensures text flows vertically */
          justify-content: center;
          align-items: center;
          font-weight: normal;
          text-align: center;
          padding: 100px;
          box-sizing: border-box;
          min-height: 10vh; /* Ensures the content area is tall enough to display the text */
        }
      </style>
    </head>
    <body>
      <h1 class='heading'>Welcome to Blog Management API App</h1>
      <p class='description'>
        The goal of this api application is to manage a blogging platform where users can write, update, and delete their blogs.
        The system will have two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.
      </p>
    </body>
    </html>
  `);
});



// error handler 

app.use(globalErrorHandle) // not call, just use 


//not route found error handler

app.use(notFound)



export default app;
