import express from "express";
import cors from "cors";
import morgan from "morgan";

import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
import Menus from "./routes/menus.routes.js";
import User from "./routes/user.routes.js";
import Credentials from "./routes/credentials.routes.js";
import Cart from "./routes/cart.routes.js";
import Categorias from "./routes/categorias.routes.js";
import Ventas from "./routes/ventas.routes.js";
import Cliente from "./routes/cliente.routes.js";
import Dashboard from "./routes/dashboard.routes.js";


const app = express();

app.use(cors());

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);
app.use("/api", Menus);
app.use("/api", User);
app.use("/api", Credentials);
app.use("/api", Cart);
app.use("/api", Categorias)
app.use("/api", Ventas)
app.use("/api", Cliente)
app.use("/api", Dashboard)


app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
