import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import resourceRoutes from "./routes/resource";

const app = express();

app.use(helmet());

const corsOptions = {
  origin: "*", // Replace * with trusted domains
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});
app.use(limiter);

app.use(express.json());

app.use("/resources", resourceRoutes);

export default app;
