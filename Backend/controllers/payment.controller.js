import { getAll, create, updateStatus } from "../models/payment.model.js";
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

export const updatePayment = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        await updateStatus(id, status);

        res.status(200).json({
            ok: true,
            message: "Payment Updated"
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: "Error updating payment",
            err: error
        });

    }

};

export const updatePaymentStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        await updateStatus(id, status);

        res.status(200).json({
            ok: true,
            message: "Estado actualizado"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error actualizando estado",
            err: error
        });

    }
};