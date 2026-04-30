console.log("LOGIN JS CARGADO");

import { request } from "../../shared/js/api.js";
import { validarCorreo, limpiarError, mostrarError } from "../../shared/js/utils.js";
import { guardarUsuario, obtenerUsuario } from "../../shared/js/storage.js";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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

        Toastify({
        text: "✅ Login exitoso!",
        duration: 2000,
        gravity: "top",
        position: "right",
        close: true,
        style: {
        background: "black",
        color: "#00ff9f",
        border: "1px solid #00ff9f",
        boxShadow: "0 0 10px #00ff9f"
        }
        }).showToast();

        setTimeout(() => {
        window.location.href = "/src/pages/dashboard/index.html";
        }, 2000);

    } catch (err) {
        Toastify({
        text: "❌ " + err.message,
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        style: {
        background: "black",
        color: "#ff4b4b",
        border: "1px solid #ff4b4b",
        boxShadow: "0 0 10px #ff4b4b"
        }
        }).showToast();
    }
});