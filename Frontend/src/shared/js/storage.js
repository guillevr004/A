export function guardarUsuario(usuario){
    localStorage.setItem("usuario", JSON.stringify(usuario))
    localStorage.setItem("auth", "true")
}

export function obtenerUsuario(){
    return JSON.parse(localStorage.getItem("usuario"))
}

export function cerrarSesion(){
    localStorage.removeItem("usuario")
    localStorage.removeItem("auth")
}

