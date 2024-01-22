import { pool } from "../db.js";

export const obtenerResumenTransacciones = async (req, res) => {

    
    try {
        const { cash_register_id } = req.params; // Asegúrate de obtener el cash_register_id correctamente.
    
        const query = `
            SELECT
              pm.method_description AS payment_method,
              COUNT(tr.transaction_id) AS number_of_transactions,
              SUM(tr.amount) AS total_collected
            FROM
              transactions tr
            INNER JOIN payment_methods pm ON tr.method_id = pm.method_id
            WHERE
              tr.cash_register_id = ? AND tr.transaction_type = 'Ingreso'
            GROUP BY
              pm.method_description;
        `;
        const [rows] = await pool.query(query, [cash_register_id]);
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const obtenerCajaAbierta = async (req, res) => {
    try {
        const query = `
            SELECT
                cr.register_id,
                cr.opening_balance + COALESCE(SUM(CASE WHEN tr.transaction_type = 'Ingreso' THEN tr.amount ELSE 0 END), 0)
                - COALESCE(SUM(CASE WHEN tr.transaction_type = 'Egreso' THEN tr.amount ELSE 0 END), 0) AS current_balance,
                cr.status,
                cr.opened_at,
                cr.closed_at,
                cr.opened_by_user_id,
                cr.closed_by_user_id
            FROM
                cash_registers cr
            LEFT JOIN transactions tr ON cr.register_id = tr.cash_register_id
            WHERE
                cr.status = 'Opened'
            GROUP BY
                cr.register_id;
        `;
        const [rows] = await pool.query(query);
        if (rows.length === 0) {
            return res.status(404).json({ message: "No hay cajas abiertas actualmente" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const obtenerEstadoTodasLasCajas = async (req, res) => {
    try {
        const query = `
            SELECT
                cr.register_id,
                cr.opening_balance + COALESCE(SUM(CASE WHEN tr.transaction_type = 'Ingreso' THEN tr.amount ELSE 0 END), 0)
                - COALESCE(SUM(CASE WHEN tr.transaction_type = 'Egreso' THEN tr.amount ELSE 0 END), 0) AS current_balance,
                cr.status
            FROM
                cash_registers cr
            LEFT JOIN transactions tr ON cr.register_id = tr.cash_register_id
            GROUP BY
                cr.register_id;
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};


export const obtenerEstadoCaja = async (req, res) => {
    try {
        const { cash_register_id } = req.body; // Cambiado a req.params para uso con métodos GET
        const query = `
            SELECT
                cr.register_id,
                cr.opening_balance + COALESCE(SUM(CASE WHEN tr.transaction_type = 'Ingreso' THEN tr.amount ELSE 0 END), 0)
                - COALESCE(SUM(CASE WHEN tr.transaction_type = 'Egreso' THEN tr.amount ELSE 0 END), 0) AS current_balance
            FROM
                cash_registers cr
            LEFT JOIN transactions tr ON cr.register_id = tr.cash_register_id
            WHERE
                cr.register_id = ? AND cr.status = 'Opened'
            GROUP BY0    
            +++
            0                cr.register_id;
        `;
                if (!cash_register_id) {
            return res.status(400).json({ message: 'El ID de la caja es requerido' });
        }
        const [rows] = await pool.query(query, [cash_register_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Caja no encontrada o ya está cerrada" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const registrarIngresoPorOrden = async (req, res) => {
    try {
        const { order_id, user_id } = req.body; // Suponiendo que se envíe el ID de la orden y el ID del usuario que maneja la orden
        const resultado = await pool.query(
            `WITH inserted_transaction AS (
                INSERT INTO transactions (cash_register_id, method_id, order_id, amount, transaction_type, description, created_by_user_id)
                SELECT
                    cash_register_id,
                    (SELECT method_id FROM payment_methods WHERE method_description = orders.method_payment),
                    order_id,
                    total_price,
                    'Ingreso',
                    'Pago de Orden',
                    $2
                FROM
                    orders
                WHERE
                    order_id = $1
                RETURNING *
            )
            SELECT * FROM inserted_transaction;`,
            [order_id, user_id]
        );

        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};


export const registrarEgresoCaja = async (req, res) => {
    try {
        const { cash_register_id, amount, description, user_id } = req.body; // Estos datos deben enviarse en la solicitud
        const newEgreso = await pool.query(
            `INSERT INTO transactions (cash_register_id, method_id, amount, transaction_type, description, created_by_user_id)
             VALUES ($1, (SELECT method_id FROM payment_methods WHERE method_description = 'Efectivo'), $2, 'Egreso', $3, $4)
             RETURNING *;`,
            [cash_register_id, amount, description, user_id]
        );

        res.json(newEgreso.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

export const realizarCuadraturaCaja = async (req, res) => {
    try {
        const { cash_register_id, user_id } = req.body; // Estos datos deben enviarse en la solicitud
        await pool.query('BEGIN'); // Iniciar transacción

        const balance = await pool.query(
            `INSERT INTO cash_register_balances (cash_register_id, end_of_day_balance, date, created_by_user_id)
             SELECT
                 cash_register_id,
                 cr.opening_balance + SUM(CASE WHEN tr.transaction_type = 'Ingreso' THEN tr.amount ELSE 0 END)
                 - SUM(CASE WHEN tr.transaction_type = 'Egreso' THEN tr.amount ELSE 0 END),
                 CURRENT_DATE,
                 $2
             FROM
                 transactions tr
             JOIN
                 cash_registers cr ON tr.cash_register_id = cr.register_id
             WHERE
                 cr.register_id = $1
             GROUP BY
                 cr.register_id
             RETURNING *;`,
            [cash_register_id, user_id]
        );

        const cerrarCaja = await pool.query(
            `UPDATE cash_registers
             SET status = 'Closed', closed_at = CURRENT_TIMESTAMP, closed_by_user_id = $2
             WHERE register_id = $1;`,
            [cash_register_id, user_id]
        );

        await pool.query('COMMIT'); // Confirmar transacción
        res.json({ balance: balance.rows[0], cierre: cerrarCaja.rowCount });
    } catch (err) {
        await pool.query('ROLLBACK'); // Revertir cambios si hay un error
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};


export const updateCajaTransaccion = async (req, res) => {
    try {
        const { amount } = req.body; // Estos datos deben enviarse en la solicitud
    
        const [rows] = await pool.query("UPDATE caja SET saldo_inicial = saldo_inicial + ? WHERE activo = 1", [amount]);
        res.json(rows);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};