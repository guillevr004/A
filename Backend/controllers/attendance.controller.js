import { getAll, create } from "../models/attendance.model.js";
import { randomUUID } from "crypto";

export const getAttendance = async (req, res) => {
    try{
        const data = await getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Algo Paso", err: error });
    }
};

export const createAttendance = async (req, res) => {
    try{
        const newAttendance = {
            id: randomUUID(),
            ...req.body
        };

        await create(newAttendance)
        res.status(201).json({ message: "Attendance Created" });
    } catch (error) {
        res.status(500).json({ message: "Error Al Crear", err: error });
    }
};