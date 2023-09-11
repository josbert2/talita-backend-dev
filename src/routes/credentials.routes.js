import { Router } from "express";
import {
    findUserOneByEmail
} from "../controllers/credentials.controller.js";

const router = Router();

// GET all Employees
router.post("/auth", findUserOneByEmail);

export default router;
