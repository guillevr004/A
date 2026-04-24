// 🔹 IMPORTS
import { obtenerUsuario, cerrarSesion } from "../../shared/js/storage.js";
import { request } from "../../shared/js/api.js";
import Chart from "chart.js/auto";

// 🔒 PROTEGER
const user = obtenerUsuario();

if(!user){
    window.location.href = "../auth/index.html";
}

// 👤 BIENVENIDA
document.getElementById("welcome").textContent = `Bienvenido ${user.name}`;

// 🚪 LOGOUT
document.getElementById("logout").addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "../auth/index.html";
});

// 🖥️ TERMINAL
const mostrarTerminal = (mensaje) => {
    const terminal = document.querySelector(".terminal");

    const p = document.createElement("p");
    p.textContent = mensaje;

    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
};

// 📊 DASHBOARD
const loadDashboard = async () => {
    try{
        const res = await request("/dashboard");

        if(res.ok){
            const data = res.dashboard;

            // 🔢 CARDS
            document.getElementById("students").textContent =
                data.totalStudents === 0 ? "No data" : data.totalStudents;

            document.getElementById("payments").textContent =
                data.pendingPayments === 0 ? "No data" : data.pendingPayments;

            document.getElementById("absences").textContent =
                data.absencesToday === 0 ? "No data" : data.absencesToday;

            // 📊 CHART 1 - DONUT
            new Chart(document.getElementById("studentsChart"), {
                type: "doughnut",
                data: {
                    labels: ["Students"],
                    datasets: [{
                        label: "Students",
                        data: [data.totalStudents],
                        backgroundColor: ["#00ff9f"],
                        borderColor: "#00ff9f",
                        borderWidth: 2
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: "#00ff9f"
                            }
                        }
                    }
                },
                plugins: [{
                    id: "glowEffect",
                    beforeDraw: (chart) => {
                        const ctx = chart.ctx;
                        ctx.save();
                        ctx.shadowColor = "#00ff9f";
                        ctx.shadowBlur = 25;
                    }
                }]
            });
            // 📊 CHART 2 - BARRAS
            new Chart(document.getElementById("paymentsChart"), {
                type: "bar",
                data: {
                    labels: ["Pending Payments", "Absences Today"],
                    datasets: [{
                        label: "System Metrics",
                        data: [data.pendingPayments, data.absencesToday],
                        backgroundColor: ["#00ff9f", "#00cc7a"],
                        borderColor: "#00ff9f",
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        x: {
                            ticks: { color: "#00ff9f" },
                            grid: { color: "rgba(0,255,159,0.1)" }
                        },
                        y: {
                            ticks: { color: "#00ff9f" },
                            grid: { color: "rgba(0,255,159,0.1)" }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: "#00ff9f"
                            }
                        }
                    }
                },
                plugins: [{
                    id: "glowBars",
                    beforeDraw: (chart) => {
                        const ctx = chart.ctx;
                        ctx.save();
                        ctx.shadowColor = "#00ff9f";
                        ctx.shadowBlur = 20;
                    }
                }]
            });

            // 🖥️ TERMINAL
            mostrarTerminal(">> ACCESS GRANTED");
            mostrarTerminal(">> DATA VISUALIZED");
            mostrarTerminal(">> SYSTEM ONLINE");
        }

    }catch(err){
        mostrarTerminal(">> ERROR LOADING SYSTEM...");
        console.log(err);
    }
};

// 🚀 INICIAR
loadDashboard();