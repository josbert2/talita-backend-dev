import { Router } from "express";
import {
    getTotalSellPerDays, getAllOrdersTodayCompletedAndServised, getTotalSellAll, getRangeTotalSell, getTopMenus
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/dashboard/getPerDays", getTotalSellPerDays);
router.get("/dashboard/getAllOrdersTodayCompletedAndServised", getAllOrdersTodayCompletedAndServised);
router.get("/dashboard/getTotalSellAll", getTotalSellAll);+
router.get("/dashboard/getRangeTotalSell/:start/:end", getRangeTotalSell);
router.get("/dashboard/getTopMenus", getTopMenus);




export default router;