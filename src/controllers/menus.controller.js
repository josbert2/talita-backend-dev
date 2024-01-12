import { pool } from "../db.js";

export const getMenus = async (req, res) => {
    try {
        const searchTerm = req.query.q || '';
        let query = "SELECT * FROM menus";
        const queryParams = [];

        if (searchTerm) {
            query += " WHERE nombre LIKE ?";
            queryParams.push(`%${searchTerm}%`);
        }

        const [rows] = await pool.query(query, queryParams);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMenu = async (req, res) => {
    
    try {
        const { id } = req.params;
    
        const [rows] = await pool.query("SELECT * FROM menus WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Menu not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}


export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM menu WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Menu not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}


export const createMenu = async (req, res) => {

    
    
    const { nombre, categoria, descripcion, precio, tipo, imagen, user_id, createdAt, updatedAt } = req.body;


    try {
        const [rows] = await pool.query(
            "INSERT INTO menus (nombre, categoria_id, descripcion, precio, tipo, imagen, user_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nombre, categoria, descripcion, precio, tipo, imagen, user_id, createdAt, createdAt]
        );
        res.status(201).json({ id: rows.insertId, nombre });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
}






