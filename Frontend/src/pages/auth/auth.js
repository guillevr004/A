console.log("LOGIN JS CARGADO");

import {request} from "../../shared/js/api.js"
import {validarCorreo, limpiarError, mostrarError} from "../../shared/js/utils.js"
import {guardarUsuario} from "../../shared/js/storage.js"
import { obtenerUsuario } from "../../shared/js/storage.js";

const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('errorMessage');
const user = obtenerUsuario();

if(user){
    window.location.href = "../dashboard/index.html";
}

form.addEventListener("submit", (e) => {
    console.log("CLICK DETECTADO");
    e.preventDefault();
});

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    limpiarError(error);

    const correo = email.value.trim();
    const clave = password.value.trim();

    if(!validarCorreo(correo)){
        mostrarError(error, "Correo inválido");
        return;
    }

    if(clave.length < 6){
        mostrarError(error, "Mínimo 6 caracteres");
        return;
    }

    try{
        const response = await request("/login", {
            method: "POST",
            body: JSON.stringify({
                email: correo,
                password: clave
            })
        });

        guardarUsuario(response.user);

        window.location.href = "/dashboard";

    }catch(err){
        mostrarError(error, err.message);
    }
});