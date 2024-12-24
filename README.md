# Express application for Car Store API

## Application overview: 
* This Express application has been developed  with TypeScript, NodeJs, ExpressJs, integrating MongoDB with Mongoose to manage a blogging platform. To ensure data integrity using the Mongoose schema  and the Zod validation.

### Project Goal:
* The goal of this application is to develop a backend server for a blogging platform where users can write, update, and delete their blogs. 
1. The system will have two roles: Admin and User. 
2. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. 
3. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

### Used Technologies
TypeScript
Node.js
Express.js
MongoDB with Mongoose
JWT


### To run the app in your local machine 
1. clone the repository, run "git clone https://github.com/hasibhu/level2Assignment3.git"
2. run 'npm i' to install all node modules dependecies. 
3. run 'npm run start:dev' to run the server app in local machine 


# working with APIs

## visit the app
 https://level2-assignment3-nu.vercel.app 

## Register User
 https://level2-assignment3-nu.vercel.app/api/auth/register

#### Request Body:

The role of the user, determining their access level. Default is "user".
```json

  {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}


for admin register: 
```json

  {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "admin"
}


```



## interface > Schema > Model > DB Query
#### IRCS 
* Request hits route and then route calls controller, controller calls service, and service will handle business ligic.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
