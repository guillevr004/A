import { getAll, create, update, remove, findByEmail } from "../models/user.model.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

// 📋 LISTAR
export const getUsers = async (req, res) => {
    try{
        const users = await getAll();

        res.json({
            ok: true,
            users
        });

    } catch (error) {
        res.status(500).json({ ok: false, message: "Error al obtener usuarios" });
    }
};

// ➕ CREAR
export const createUser = async (req, res) => {
    try{
        const { first_name, last_name, email, password, role } = req.body;

        const hash = await bcrypt.hash(password, 10);

        await create({
            id: randomUUID(),
            first_name,
            last_name,
            email,
            password_hash: hash,
            phone: null,
            role,
            active: 1,
            created_at: new Date(),
            updated_at: new Date()
        });

        res.json({ ok: true });

    } catch (error) {
        res.status(500).json({ ok: false, message: "Error al crear usuario" });
    }
};

// ✏️ EDITAR
export const updateUser = async (req, res) => {
    try{
        const { id } = req.params;

        await update(id, req.body);

        res.json({ ok: true });

    } catch (error) {
        res.status(500).json({ ok: false });
    }
};

// 🗑️ ELIMINAR
export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        await remove(id);

        res.json({ ok: true });

    } catch (error) {
        res.status(500).json({ ok: false });
    }
};

// 🔍 BUSCAR
export const searchUser = async (req, res) => {
    try{
        const { email } = req.query;

        const user = await findByEmail(email);

        res.json({ ok: true, user });

    } catch (error) {
        res.status(500).json({ ok: false });
    }
};