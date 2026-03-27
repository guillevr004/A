import { getAll, create } from "../models/guardian.model.js";
import { randomUUID } from "crypto";

export const getGuardian = async (req, res) => {
    try{
        const data = await getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Algo Paso", err: error });
    }
};

export const createGuardian = async (req, res) => {
    try{
        const newGuardian = {
            id: randomUUID(),
            ...req.body
        };

        await create(newGuardian)
        res.status(201).json({ message: "Guardian Created" });
    } catch (error) {
        res.status(500).json({ message: "Error Al Crear", err: error });
    }
};