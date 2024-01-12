import { pool } from "../db.js"; 

export const findAllSalesAndPrice = async (req, res) => { 

    try {
    
        const [rows] = await pool.query("SELECT MONTH(order_date) AS mes, YEAR(order_date) AS ano, COUNT(*) AS total_registros, SUM(total_price) AS total_ventas FROM orders GROUP BY YEAR(order_date), MONTH(order_date) ORDER BY ano DESC, mes DESC");
        return res.status(201).json(rows[0]);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}

export const findAllSalesAndPricePerMonth = async (req, res) => {

    try {
    
        const [rows] = await pool.query("SELECT COUNT(*) as total_registros, SUM(precio_total) as total_ventas FROM ventas WHERE MONTH(fecha) = MONTH(CURRENT_DATE());");
        return res.status(201).json(rows[0]);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}