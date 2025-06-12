import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import indexRouter from "./routes/index.js";
import authorsRouter from "./routes/authors.js";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
const __dirname = path.resolve();

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use("/", indexRouter);
app.use("/authors", authorsRouter);

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.listen(process.env.PORT || 3000);
