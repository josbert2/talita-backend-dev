// cartController.js
import { pool } from "../db.js";

export const createItemCart = async (req, res) => {


    const { id_usuario, menu_id, cantidad } = req.body;
    
    return res.json(0);
    try {
        // Verificar si el usuario ya tiene un carrito activo
        let [carritos] = await pool.query("SELECT cart_id FROM menu_carts WHERE usuario_id = ?", [id_usuario]);
    

        let cart_id;

        // Si no tiene un carrito, crear uno
        if (carritos.length === 0) {
            const [rows] = await pool.query("INSERT INTO menu_carts (usuario_id) VALUES (?)", [id_usuario]);
            cart_id = rows.insertId;
        
        } else {
            cart_id = carritos[0].cart_id;
        }

        // Insertar el ítem al carrito
        const [rowsCart] = await pool.query("INSERT INTO cart_items (cart_id, menu_id, cantidad) VALUES (?, ?, ?)", [
            cart_id,
            menu_id,
            cantidad
        ]);

        

    

        res.json({ success: true, message: 'Item added to cart.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }
}