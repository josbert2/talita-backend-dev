import { Router } from "express";
import {
    createItemCart, orderCart, getCartItemsByOrder, getAllOrders, getCartItemsDashboard, marcarPreparado, getLastedOrders
} from "../controllers/cart.controller.js";

const router = Router();

// GET all Employees
router.post("/cart", createItemCart);
router.post("/addOrder", orderCart);
router.get("/cartItemsByOrder/:id", getCartItemsByOrder);
router.get("/orders/allOrders", getAllOrders);
router.get("/orders/dashboard", getCartItemsDashboard);
router.put("/orders/marcarPreparado", marcarPreparado);
router.get("/orders/dashboard/last", getLastedOrders);







export default router;
