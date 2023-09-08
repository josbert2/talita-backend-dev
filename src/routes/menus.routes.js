import { Router } from "express";
import { getMenus, createMenu } from "../controllers/menus.controller.js";
const router = Router();


router.get("/menus", getMenus);
router.post("/menus", createMenu);

export default router;