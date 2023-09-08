import express from "express";
import cors from "cors";
import morgan from "morgan";

import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
import Menus from "./routes/menus.routes.js";

const app = express();

app.use(cors());

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);
app.use("/api", Menus);


app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
