import { getAll, create, update, remove } from "../models/student.model.js";
import { randomUUID } from "crypto";

export const getStudent = async (req, res) => {
    try{
        const students = await getAll();

        res.json({
            ok: true,
            students
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener estudiantes"
        });
    }
};

export const createStudent = async (req, res) => {
    try{
        const newStudent = {
            id: randomUUID(),
            ...req.body
        };

        await create(newStudent)
        res.status(201).json({ message: "Student Created" });
    } catch (error) {
        res.status(500).json({ message: "Error Al Crear", err: error });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        await update(id, req.body);

        res.json({ message: "Student updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating student" });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        await remove(id);

        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
};