import { pool } from "../db.js";

export const createCliente = async (req, res) => {

    const { nombre, apellido, telefono, direccion, rut, email, password } = req.body;



    try {
        const [rows] = await pool.query("INSERT INTO clientes (nombre, apellido, telefono, rut) VALUES (?, ?, ?, ?)", [
            nombre,
            apellido,
            telefono,
            rut,
        ]);

        
        if (rows.affectedRows === 1){
            var insertId = rows.insertId;
            res.json({ success: true, cliente: {
                nombre,
                apellido,
                telefono,
                rut,
                email,
                insertId
            } });
        } else{
            res.json({ success: false, message: 'Error al crear cliente.' });
        }
        
        
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }

}