import { request } from "../../shared/js/api.js";
import { obtenerUsuario } from "../../shared/js/storage.js";

// 🔒 PROTECCIÓN
const user = obtenerUsuario();

if(!user){
    window.location.href = "../auth/index.html";
}

let editingId = null;
let userToDelete = null;

// 🗑️ ABRIR MODAL DE CONFIRMACIÓN
window.deleteUser = (id) => {
    userToDelete = id;
    document.getElementById("confirmModal").classList.remove("hidden");
};

// ✅ CONFIRMAR ELIMINACIÓN
document.getElementById("confirmYes").addEventListener("click", async () => {
    await request(`/users/${userToDelete}`, {
        method: "DELETE"
    });

    document.getElementById("confirmModal").classList.add("hidden");
    loadUsers();

    console.log(">> USER DELETED SUCCESSFULLY");
});

// ❌ CANCELAR
document.getElementById("confirmNo").addEventListener("click", () => {
    document.getElementById("confirmModal").classList.add("hidden");
});

// 🔄 CARGAR USUARIOS
const loadUsers = async () => {
    const res = await request("/users");

    const table = document.getElementById("usersTable");
    table.innerHTML = "";

    res.users.forEach(u => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${u.first_name} ${u.last_name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>
                <button onclick="editUser('${u.id}', '${u.first_name}', '${u.last_name}', '${u.email}', '${u.role}')">Edit</button>
                <button onclick="deleteUser('${u.id}')">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });
};

// ➕ CREAR / EDITAR
document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
        role: role.value
    };

    if(editingId){
        await request(`/users/${editingId}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    } else {
        await request("/users", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }

    editingId = null;
    document.getElementById("userForm").reset();
    loadUsers();
});

// ✏️ EDITAR
window.editUser = (id, fn, ln, em, rl) => {
    editingId = id;

    first_name.value = fn;
    last_name.value = ln;
    email.value = em;
    role.value = rl;
};

// 🔍 BUSCAR
document.getElementById("searchBtn").addEventListener("click", async () => {
    const email = document.getElementById("searchEmail").value;

    const res = await request(`/users/search?email=${email}`);

    if(res.user){
        alert(`Encontrado: ${res.user.first_name}`);
    } else {
        alert("No encontrado");
    }
});

// 🚀 INIT
loadUsers();