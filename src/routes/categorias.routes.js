import { Router } from "express";
import {
    createCategorias, getAllCategorias, getCategoriaPerMenus, DeleteCategorias
} from "../controllers/categorias.controller.js";

const router = Router();


router.post("/categorias", createCategorias);
router.get("/categorias", getAllCategorias)
router.get("/categorias/perMenus", getCategoriaPerMenus);
router.delete("/categorias/:id", DeleteCategorias);

export default router;