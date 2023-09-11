import { Router } from "express";
import { getMenus, getMenu, createMenu } from "../controllers/menus.controller.js";
const router = Router();


router.get("/menus", getMenus);
router.get("/menus/:id", getMenu);
router.post("/menus", createMenu);


export default router;