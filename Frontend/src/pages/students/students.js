// 🔹 IMPORTS
import { request } from "../../shared/js/api.js";
import { obtenerUsuario } from "../../shared/js/storage.js";

// 🔒 PROTEGER (igual que dashboard)
const user = obtenerUsuario();

if(!user){
    window.location.href = "../auth/index.html";
}

// 📊 CARGAR ESTUDIANTES
const loadStudents = async () => {
    try{
        const res = await request("/students");

        if(res.ok){
            const students = res.students;

            const table = document.getElementById("studentsTable");
            table.innerHTML = "";

            students.forEach(s => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${s.student_code}</td>
                    <td>${s.first_name} ${s.last_name}</td>
                    <td>${s.document_type || ''} ${s.document_number || ''}</td>
                    <td>${s.grade || '-'}</td>
                    <td>${s.school_year || '-'}</td>
                    <td>${s.status}</td>
                `;

                table.appendChild(row);
            });
        }

    }catch(err){
        console.log(err);
    }
};

// 🚀 INICIAR
loadStudents();