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

export const getAllCategorias = async (req, res) => {
    
        try {
            const [rows] = await pool.query(`SELECT 
            categorias.nombre AS nombre_categoria, 
            categorias.id AS id_categoria,  
            categorias.svg_nombre AS svg_nombre_categoria,
            categorias.deleted AS deleted_categoria,
            COUNT(menus.id) AS numero_de_productos
        FROM 
            categorias
        LEFT JOIN 
            menus ON categorias.id = menus.categoria_id  
        GROUP BY 
            categorias.id, categorias.nombre  -- Cambia 'id_categoria' por 'id' aquí también.
        ORDER BY 
            categorias.id DESC;`);
            res.json(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error });
        }
    
}   

export const getCategoriaPerMenus = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                c.nombre AS categoria_nombre,
                c.svg_nombre AS categoria_svg_nombre,
                m.id AS id,
                m.nombre AS producto_nombre,
                m.descripcion AS producto_descripcion,
                m.ingredientes,
                m.precio,
                m.precioOferta,
                m.stock,
                m.imagen,
                m.tipo
            FROM
                categorias c
            LEFT JOIN 
                menus m ON c.id = m.categoria_id
            ORDER BY 
                c.nombre, m.nombre;
        `);

        const resultMap = {};

        rows.forEach(row => {
            if (!resultMap[row.categoria_nombre]) {
                resultMap[row.categoria_nombre] = {
                    categoria_nombre: row.categoria_nombre,
                    categoria_svg_nombre: row.categoria_svg_nombre,
                    productos: []
                };
            }

            if(row.producto_nombre) {
                resultMap[row.categoria_nombre].productos.push({
                    id: row.id,
                    producto_nombre: row.producto_nombre,
                    producto_descripcion: row.producto_descripcion,
                    ingredientes: row.ingredientes,
                    precio: row.precio,
                    precioOferta: row.precioOferta,
                    stock: row.stock,
                    imagen: row.imagen,
                    tipo: row.tipo
                });
            }
        });

        const finalResult = Object.values(resultMap);

        res.json(finalResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }
}

export const DeleteCategorias = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("UPDATE categorias SET deleted = 1 WHERE categorias.id = ?;", [id]);
        res.json({ success: true, message: 'Categorias deleted.', affectedRows: rows.affectedRows });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }
}