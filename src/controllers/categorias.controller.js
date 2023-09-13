import { pool } from "../db.js";

export const createCategorias = async (req, res) => {

    try {
        const { nombre, descripcion } = req.body;
        const [rows] = await pool.query("INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion]);
        res.json({ success: true, message: 'Categorias added.', id: rows.insertId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }

}