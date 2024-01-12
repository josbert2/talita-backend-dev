import { Router } from "express";
import {
    createCliente
} from "../controllers/cliente.controller.js";

const router = Router();


router.post("/cliente", createCliente);

export default router;