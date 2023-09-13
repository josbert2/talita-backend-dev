import { Router } from "express";
import {
    createCategorias
} from "../controllers/categorias.controller.js";

const router = Router();


router.post("/", createItemCart);

