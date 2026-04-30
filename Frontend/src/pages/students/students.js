import { request } from "../../shared/js/api.js";
import { obtenerUsuario } from "../../shared/js/storage.js";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const user = obtenerUsuario();

if (!user) {
    window.location.href = "../auth/index.html";
}

let studentsData = [];

const loadStudents = async () => {
    try {
        const res = await request("/students");

        studentsData = res.students || res;

        renderStudents(studentsData);
    } catch (err) {
        console.error(err);
    }
};

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

document.getElementById("searchStudent").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = studentsData.filter(s =>
        s.first_name.toLowerCase().includes(value) ||
        s.last_name.toLowerCase().includes(value) ||
        s.student_code.toLowerCase().includes(value)
    );

    renderStudents(filtered);
});

document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("FORM ENVIADO");
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

        Toastify({
        text: "📚 Estudiante creado!",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
            background: "black",
            color: "#00ff9f",
            border: "1px solid #00ff9f",
            boxShadow: "0 0 10px #00ff9f"
        }
        }).showToast();

        document.getElementById("studentForm").reset();
        loadStudents();

    } catch (err) {
        console.error(err);

        Toastify({
        text: "❌ Error al crear estudiante",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "black",
            color: "#ff4b4b",
            border: "1px solid #ff4b4b",
            boxShadow: "0 0 10px #ff4b4b"
        }
        }).showToast();
    }
});

loadStudents();