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
```

for admin register: 
```json

  {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "admin"
}
```



#### Login User
Metod: POST  
api format: https://level2-assignment3-nu.vercel.app/api/auth/login

Description: Authenticates a user with their email and password and generates a JWT token.

Request Body:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:

Success (200):

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}

```



## Blog Management 

#### To insert blog content info in DB
* use postman application with POST method with url  https://level2-assignment3-nu.vercel.app/api/blogs
* data format will be in the following format and business log will add author info like- name, email and author id from the user list 
```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```


#### To update blog info in DB

* use postman application with PUT method with url https://level2-assignment3-nu.vercel.app/api/blogs/:id

* Use blog id at the end of the url replacing ":id". 
* Data format will be in the following format: you may send both or either one to update.
```json
{
  "title": "Your desired title",
  "content": "Your desired body of the blog."
}
```

#### To delete blog info from DB

* use postman application with DELETE method with url https://level2-assignment3-nu.vercel.app/api/blogs/:id
* Use blog id at the end of the url replacing ":id". 


#### Get All Blogs (Public)
this is a public api
use postman application with GET method with url https://level2-assignment3-nu.vercel.app/api/blogs

Description: Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

Query Parameters:
search: Search blogs by title or content (e.g., search=blogtitle).
sortBy: Sort blogs by specific fields such as createdAt or title (e.g., sortBy=title).
sortOrder: Defines the sorting order. Accepts values asc (ascending) or desc (descending). (e.g., sortOrder=desc).
filter: Filter blogs by author ID (e.g., author=authorId).
Example Request URL:

 * use postman application with DELETE method with url https://level2-assignment3-nu.vercel.app/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter={authorID}
  please replace the authorID with author id from blog. you may modify other info like searchTerm and so on...





## Admin Actions

#### Block User
* use postman application with PATCH method with url https://level2-assignment3-nu.vercel.app/api/admin/users/:userId/block
Replace ":userId" with user id from db 
Request Header:Authorization: Bearer <admin_token>

Response:
```json
Success (200):
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```


#### Delete Blog
* use postman application with PATCH method with url https://level2-assignment3-nu.vercel.app/api/admin/blogs/:id
Replace ":id" with blog id from db 
Request Header:Authorization: Bearer <admin_token>

Response:
```json
Success (200):
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```


## interface > Schema > Model > DB Query
#### IRCS 
* Request hits route and then route calls controller, controller calls service, and service will handle business ligic.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
