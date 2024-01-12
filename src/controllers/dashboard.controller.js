// cartController.js
import { pool } from "../db.js";


const getDeltaType = (delta) => {
    if (delta > 10) {
        return "moderateIncrease";
    } else if (delta > 0) {
        return "moderateIncrease";
    } else if (delta === 0) {
        return "moderateDecrease";
    } else if (delta > -10) {
        return "moderateDecrease";
    } else {
        return "moderateDecrease";
    }
};


export const getTotalSellPerDays = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                current.fecha,
                current.total,
                previous.total as total_previo,
                ((current.total - IFNULL(previous.total, 0)) / IFNULL(previous.total, 1)) * 100 as delta_porcentaje
            FROM (
                SELECT DATE(order_date) as fecha, SUM(total_price) as total
                FROM orders
                WHERE status = 'Completed' 
                GROUP BY DATE(order_date)
            ) as current
            LEFT JOIN (
                SELECT DATE(order_date) as fecha, SUM(total_price) as total
                FROM orders
                WHERE status = 'Completed'
                GROUP BY DATE(order_date)
            ) as previous ON previous.fecha = DATE_SUB(current.fecha, INTERVAL 1 DAY)
            ORDER BY current.fecha;`
        );

        const dataForFrontend = rows.map(row => {
            const total = parseFloat(row.total);
            const totalPrevio = row.total_previo ? parseFloat(row.total_previo) : 0;
            const deltaPorcentaje = totalPrevio ? ((total - totalPrevio) / totalPrevio) * 100 : null;
            const deltaType = getDeltaType(deltaPorcentaje);

            return {
                title: "Profit",
                date: row.fecha,
                metric: total,
                metricPrev: totalPrevio,
                delta: deltaPorcentaje !== null ? `${Math.abs(deltaPorcentaje).toFixed(1)}%` : "N/A",
                deltaType: deltaType,
            };
        });

        res.json(dataForFrontend);

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};