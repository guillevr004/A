import { getAll, create } from "../models/notification.model.js";
import { randomUUID } from "crypto";

export const getNotification = async (req, res) => {
    try{
        const data = await getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Algo Paso", err: error });
    }
};

export const createNotification = async (req, res) => {
    try{
        const newNotification = {
            id: randomUUID(),
            ...req.body
        };

        await create(newNotification)
        res.status(201).json({ message: "Notification Created" });
    } catch (error) {
        res.status(500).json({ message: "Error Al Crear", err: error });
    }
};