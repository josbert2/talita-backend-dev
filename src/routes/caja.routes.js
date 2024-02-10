import { Router } from "express";
import {
    obtenerEstadoCaja, updateCajaTransaccion, obtenerResumenTransacciones, obtenerCajaAbierta, obtenerEstadoTodasLasCajas, registrarIngresoPorOrden, registrarEgresoCaja, realizarCuadraturaCaja
} from "../controllers/caja.controller.js";

const router = Router();

// GET all Employees
router.post("/caja/getCaja", obtenerEstadoCaja);
router.get("/caja/getCajas", obtenerEstadoTodasLasCajas);
/**
* @Params (req.params): cash_register_id
*/
router.get('/caja/caja-abierta', obtenerCajaAbierta);
router.get('/caja/transacciones/:cash_register_id', obtenerResumenTransacciones);
router.post('/caja/updateCajaTransaccion', updateCajaTransaccion);


export default router;