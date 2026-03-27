import db from "../config/db.js";

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM attendance");
    return rows;
};

export const create = async (data) => {
    const {id, student_id, date, status, check_in, check_out, observations, registered_by, created_at, updated_at} =
        data;

    const [result] = await db.query(
        `INSERT INTO payments (id, student_id, date, status, check_in, check_out, observations, registered_by, created_at, updated_at)
        VALUES (?,?,?,?,?,?,?,?,?,?)`,

        [id, student_id, date, status, check_in, check_out, observations, registered_by, created_at, updated_at]
    );
};