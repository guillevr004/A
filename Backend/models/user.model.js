import db from "../config/db.js";

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
};

export const create = async (data) => {
    const {id, first_name, last_name, email, password_hash, phone, role, active, created_at, updated_at} =
        data;

    const [result] = await db.query(
        `INSERT INTO users (id, first_name, last_name, email, password_hash, phone, role, is_active, created_at, updated_at)
        VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [id, first_name, last_name, email, password_hash, phone, role, active, created_at, updated_at]
    );
};

export const update = async (id, data) => {
    const { first_name, last_name, email, role } = data;

    await db.query(
        `UPDATE users 
         SET first_name=?, last_name=?, email=?, role=? 
         WHERE id=?`,
        [first_name, last_name, email, role, id]
    );
};

export const remove = async (id) => {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
};

export const findByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};