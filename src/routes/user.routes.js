import { Router } from "express";
import { findUserOneByEmail } from "../controllers/user.controller.js";
const router = Router();


router.get("/user", findUserOneByEmail);


export default router;