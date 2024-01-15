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
                WHERE status = 'Served'  OR status = 'Completed'
                GROUP BY DATE(order_date)
            ) as current
            LEFT JOIN (
                SELECT DATE(order_date) as fecha, SUM(total_price) as total
                FROM orders
                WHERE status = 'Served' OR status = 'Completed'
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


export const getTotalSellAll = async (req, res) => {

    try {
            
            const [rows] = await pool.query(`
                SELECT 
                    SUM(total_price) as total
                FROM orders
                WHERE status = 'Served' OR status = 'Completed';`
            );
    
            const total = parseFloat(rows[0].total);
    
            res.json(total);
    } catch (error) {
        
    }

}
const getMonthsArray = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months = [];
    let currentDate = startDate;
    

    while (currentDate <= endDate) {
        const formattedMonth = currentDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        console.log(formattedMonth);
        months.push(formattedMonth);
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
};
const mergeData = (allMonths, dbData) => {
    console.log(dbData);
    return allMonths.map((month) => {
        const dbEntry = dbData.find((entry) => entry.month === month);
        
        return {
            Month: month,
            Ventas: dbEntry ? parseFloat(dbEntry.total_ventas) : 0,
            Ordenes: dbEntry ? parseInt(dbEntry.total_ordenes) : 0,
            Profit: 0,  // Puedes ajustar esto según tus necesidades
            Customers: 0,  // Puedes ajustar esto según tus necesidades
        };
    });
};
export const getRangeTotalSell = async (req, res) => {
    
        try {
                
            const [rows] = await pool.query(`
                SELECT 
                    DATE_FORMAT(order_date, '%b %y') AS month,
                    SUM(total_price) AS total_ventas,
                    COUNT(*) AS total_ordenes
                FROM orders
                WHERE status IN ('Served', 'Completed')
                    AND order_date BETWEEN STR_TO_DATE('${req.params.start}', '%Y-%m-%d') AND STR_TO_DATE('${req.params.end}', '%Y-%m-%d')
                GROUP BY month
                ORDER BY month;
            `);

        

            // Crear un array con todos los meses en el rango
            const allMonths = getMonthsArray(req.params.start, req.params.end);
            
            // Fusionar los datos de la base de datos con todos los meses
            const mergedData = mergeData(allMonths, rows);
            

            res.json(mergedData);
        
            
        } catch (error) {
            
        }
    
}   

export const getAllOrdersTodayCompletedAndServised = async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT 
                DATE(order_date) as fecha, 
                COUNT(*) as total
            FROM orders
            WHERE status = 'Served' OR status = 'Completed' AND DATE(order_date) = CURDATE()
            GROUP BY DATE(order_date);`
        );

        const dataForFrontend = rows.map(row => {
            return {
                title: "Orders",
                date: row.fecha,
                metric: row.total,
                metricPrev: null,
                delta: null,
                deltaType: null,
            };
        });

        res.json(dataForFrontend);

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }

}

export const getTopMenus = async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT
                m.id AS menu_id,
                m.nombre AS menu_nombre,
                m.categoria_id,
                COUNT(o.menu_id) AS total_ventas
                FROM orderdetails o
                JOIN menus m ON o.menu_id = m.id
                JOIN orders ord ON o.order_id = ord.order_id  -- Ajusta según la relación real en tu base de datos
                WHERE ord.status IN ('Served', 'Completed')
                GROUP BY m.id, m.nombre, m.categoria_id  -- Agrega todas las columnas no agregadas
                ORDER BY total_ventas DESC
                LIMIT 5;
        `
        );
        const pages = rows.map((row) => ({
            name: `${row.menu_nombre}`,  // Puedes personalizar la ruta según tu aplicación
            value: row.total_ventas,
        }));

        res.json(pages);

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }

}
