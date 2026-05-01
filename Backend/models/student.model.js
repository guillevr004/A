import db from "../config/db.js";

export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM students");
    return rows;
};

export const create = async (data) => {
    const {id, student_code, first_name, last_name, document_type, document_number, birth_date, grade, school_year} =
        data;

    const [result] = await db.query(
        `INSERT INTO students (id, student_code, first_name, last_name, document_type, document_number, birth_date, grade,
        school_year) VALUES (?,?,?,?,?,?,?,?,?)`,
        [id, student_code, first_name, last_name, document_type, document_number, birth_date, grade, school_year]
    );
};

export const update = async (id, data) => {
    const { student_code, first_name, last_name, document_type, document_number, grade, school_year } = data;

    await db.query(
        `UPDATE students 
         SET student_code=?, first_name=?, last_name=?, document_type=?, document_number=?, grade=?, school_year=?
         WHERE id=?`,
        [student_code, first_name, last_name, document_type, document_number, grade, school_year, id]
    );
};

export const remove = async (id) => {
    await db.query("DELETE FROM students WHERE id = ?", [id]);
};