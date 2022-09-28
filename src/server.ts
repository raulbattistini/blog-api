import express from "express";
import cors from "cors";
import "dotenv/config";
import { Routes } from "./routes";

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

Routes(app);
  
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}!`);
});
