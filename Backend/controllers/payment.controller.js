import { getAll, create } from "../models/payment.model.js";
import { randomUUID } from "crypto";

export const getPayment = async (req, res) => {
    try{
        const data = await getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Algo Paso", err: error });
    }
};

export const createPayment = async (req, res) => {
    try{
        const newPayment = {
            id: randomUUID(),
            ...req.body
        };

        await create(newPayment)
        res.status(201).json({ message: "Payment Created" });
    } catch (error) {
        res.status(500).json({ message: "Error Al Crear", err: error });
    }
};