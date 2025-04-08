import express from "express";
import connectDb from "./config/db.js";
import userRoutes from "./user/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("2048 Home Page");
});
app.use("/users", userRoutes);

const port = 4000;
app.listen(port, console.log(`listening to the port ${port}`));
