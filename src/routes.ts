import { Express } from "express";
import { PostController } from "./controllers/PostController";
import { connection } from "./datasource";
import { Post } from "./models/Post";


export var postRepo = connection.getRepository(Post);


export const Routes = (app: Express) => {
  connection
    .initialize()
    .then(() => {
      console.log("MySQL database initialized");
    })
    .catch((err) => {
      console.error("An error occurred during initialization: ", err.message);
    });


  app.get("/api/:id", PostController.getById);
// select * from database. route is defined, but their use is not recommended though
  app.get('/api/', PostController.getAll)

  app.post('/api/', PostController.create);

  app.delete('/api/:id', PostController.delete)

  app.put('/api/:id', PostController.update);
};
