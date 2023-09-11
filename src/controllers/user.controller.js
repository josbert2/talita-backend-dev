import { pool } from "../db.js";


export const findUserOneByEmail = async (req, res) => {


    try {
        // get parameter
        const { email } = req.query;

        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
            email,
        ]);
        if (rows.length <= 0) {
            const [createUser] = await pool.query("INSERT INTO usuarios (email) VALUES (?)", [
                email,
            ]);
            return res.status(201).json({ id: createUser.insertId, email, message: "User created" });
        }else{
            return res.status(201).json({ message: "User already exists" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}