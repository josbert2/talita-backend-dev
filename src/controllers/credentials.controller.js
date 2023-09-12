import { pool } from "../db.js";


export const findUserOneByEmail = async (req, res) => {
    // make login
    const { email, hashedPassword } = req.body;
    


    try {

        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
            email,
        
        ]);

        
        if (rows.length <= 0) {
            // user dont exist 
            return res.status(201).json({ message: "User dont exist" });
        }else{
            const { id, email, hashedPassword, nombre } = rows[0];
            return res.status(201).json({ id, email, hashedPassword, nombre, message: "User found" });
        }

        res.json(rows[0]);

    } catch (error) {
        console.log(error);
    }
    

}