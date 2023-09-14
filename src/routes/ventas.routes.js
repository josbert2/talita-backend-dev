import { Router } from "express";
import { findAllSalesAndPrice,
         findAllSalesAndPricePerMonth } from "../controllers/ventas.controller.js";
const router = Router();


router.get("/ventas", findAllSalesAndPrice);
router.get("/ventas", findAllSalesAndPricePerMonth);


export default router;