import { getAll, create } from "../models/user.model.js";
import { randomUUID } from "crypto";

export const getUser = async (req, res) => {
    try{
        const data = await getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Algo Paso", err: error });
    }
};

export const createUser = async (req, res) => {
    try{
        const newUser = {
            id: randomUUID(),
            ...req.body
        };

        await create(newUser)
        res.status(201).json({ message: "User Created" });
    } catch (error) {
        res.status(500).json({ message: "Error Al Crear", err: error });
    }
};