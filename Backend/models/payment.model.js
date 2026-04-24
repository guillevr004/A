import db from "../config/db.js";

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM payments");
    return rows;
};

export const create = async (data) => {
    const {id, account_receivable_id, recorded_by_user_id, payment_date, amount_paid, payment_method, reference, created_at} =
        data;

    const [result] = await db.query(
        `INSERT INTO payments (id, account_receivable_id, recorded_by_user_id, payment_date, amount_paid,
        payment_method, reference, created_at) VALUES (?,?,?,?,?,?,?,?)`,

        [id, account_receivable_id, recorded_by_user_id, payment_date, amount_paid, payment_method, reference, created_at]
    );
};