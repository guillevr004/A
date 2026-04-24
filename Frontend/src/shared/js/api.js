import { obtenerUsuario } from "./storage.js";
const API_URL = "http://localhost:3000/api"

const user = obtenerUsuario()

export async function request(endpoint, options = {}) {
    const response = await fetch(API_URL+endpoint, {
        headers:{
            "Content-Type" : "application/json",
            "x-auth": user? JSON.stringify(user) : ""
        },
        ...options.headers
    });

    const data = await response.json()

    if(response.status === 404){
        window.location.href = "/src/pages/404/index.html";
        return;
    }

    if(!response.ok){
        throw new Error(data.message || "Error del servidor")
    }

    return data;
}