import { Router } from "express";
import {
    createItemCart
} from "../controllers/cart.controller.js";

const router = Router();

// GET all Employees
router.post("/cart", createItemCart);

export default router;
