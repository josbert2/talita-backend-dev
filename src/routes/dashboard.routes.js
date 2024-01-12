import { Router } from "express";
import {
    getTotalSellPerDays
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/dashboard/getPerDays", getTotalSellPerDays);


export default router;