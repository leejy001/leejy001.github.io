import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./config/index.js";
// Routes
import postRoutes from "./routes/api/post.js";
import userRoutes from "./routes/api/user.js";
import authRoutes from "./routes/api/auth.js";
import searchRoutes from "./routes/api/search.js";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connecting Success!!"))
  .catch((e) => console.log(e));

//Use routes
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

export default app;
