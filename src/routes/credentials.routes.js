import { Router } from "express";
import {
    findUserOneByEmail
} from "../controllers/credentials.controller.js";

const router = Router();

// GET all Employees
router.post("/credentials", findUserOneByEmail);

export default router;
