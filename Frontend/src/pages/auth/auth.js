console.log("LOGIN JS CARGADO");

import { request } from "../../shared/js/api.js";
import { validarCorreo, limpiarError, mostrarError } from "../../shared/js/utils.js";
import { guardarUsuario, obtenerUsuario } from "../../shared/js/storage.js";

const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("errorMessage");

// 🔐 Si ya hay sesión → dashboard
const user = obtenerUsuario();
if (user) {
    window.location.href = "/src/pages/dashboard/index.html";
}

// 🚀 LOGIN
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    limpiarError(error);

    const correo = email.value.trim();
    const clave = password.value.trim();

    if (!validarCorreo(correo)) {
        mostrarError(error, "Correo inválido");
        return;
    }

    if (clave.length < 6) {
        mostrarError(error, "Mínimo 6 caracteres");
        return;
    }

    try {
        const response = await request("/login", {
            method: "POST",
            body: JSON.stringify({
                email: correo,
                password: clave
            })
        });

        guardarUsuario(response.user);

        // ✅ REDIRECCIÓN SEGURA
        window.location.href = "/src/pages/dashboard/index.html";

    } catch (err) {
        mostrarError(error, err.message);
    }
});