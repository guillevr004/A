import { request } from "../../shared/js/api.js";
import { obtenerUsuario } from "../../shared/js/storage.js";

const user = obtenerUsuario();

if (!user) {
    window.location.href = "../auth/index.html";
}

let studentsData = [];

// 🔄 CARGAR ESTUDIANTES
const loadStudents = async () => {
    try {
        const res = await request("/students");

        studentsData = res.students || res;

        renderStudents(studentsData);
    } catch (err) {
        console.error(err);
    }
};

// 🧱 RENDER TABLA
const renderStudents = (data) => {
    const table = document.getElementById("studentsTable");
    table.innerHTML = "";

    data.forEach(s => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${s.student_code}</td>
            <td>${s.first_name} ${s.last_name}</td>
            <td>${s.document_type || ""} ${s.document_number || ""}</td>
            <td>${s.grade || ""}</td>
            <td>${s.school_year || ""}</td>
            <td>${s.status || "active"}</td>
        `;

        table.appendChild(row);
    });
};

// 🔍 FILTRO
document.getElementById("searchStudent").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = studentsData.filter(s =>
        s.first_name.toLowerCase().includes(value) ||
        s.last_name.toLowerCase().includes(value) ||
        s.student_code.toLowerCase().includes(value)
    );

    renderStudents(filtered);
});

// ➕ CREAR ESTUDIANTE
document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        student_code: student_code.value,
        first_name: first_name.value,
        last_name: last_name.value,
        document_type: document_type.value,
        document_number: document_number.value,
        grade: grade.value,
        school_year: school_year.value
    };

    try {
        await request("/students", {
            method: "POST",
            body: JSON.stringify(data)
        });

        document.getElementById("studentForm").reset();

        loadStudents();

    } catch (err) {
        alert(err.message);
    }
});

// 🚀 INIT
loadStudents();