


// export interface TBlog {

//   title: string;
//   content: string;
//   author: {
//     name: string;
//     email: string;
//   };
//   isPublished: boolean
// }


export interface TBlog {
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  isPublished: boolean;
}
