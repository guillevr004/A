import db from "../config/db.js"

export const FindUserByEmail = async (email)=>{

    const [rows] = await db.query("SELECT id, first_name, last_name, email, password_hash, phone, role, is_active AS active, created_at, updated_at FROM users WHERE email = ?", [email])

    return rows[0];

}