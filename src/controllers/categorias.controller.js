import { pool } from "../db.js";

export const createCategorias = async (req, res) => {

    try {
        const { nombre } = req.body;
        const [rows] = await pool.query("INSERT INTO categorias (nombre) VALUES (?)", [nombre]);
        res.json({ success: true, message: 'Categorias added.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }

}