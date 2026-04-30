import { obtenerUsuario } from "./storage.js";

const API_URL = "http://localhost:3000/api";

export async function request(endpoint, options = {}) {

    const user = obtenerUsuario();

    const response = await fetch(API_URL + endpoint, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            "x-auth": user ? JSON.stringify(user) : ""
        },
        body: options.body
    });

    let data;
    try {
        data = await response.json();
    } catch {
        data = {};
    }

    if (response.status === 404) {
        window.location.href = "/src/pages/404/index.html";
        return;
    }

    if (!response.ok) {
        throw new Error(data.message || "Error del servidor");
    }

    return data;
}