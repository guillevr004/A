import { request } from "../../shared/js/api.js";

const table = document.getElementById("alertsTable");

let pendingPayments = [];

const loadAlerts = async () => {

    const payments = await request("/payment");

    pendingPayments = payments.filter(p => p.status === "pending");

    renderAlerts();
};

const renderAlerts = () => {

    table.innerHTML = "";

    pendingPayments.forEach(p => {

        const row = document.createElement("tr");

        row.innerHTML = `
        
            <td>${p.id}</td>
            <td>$${p.amount_paid}</td>
            <td>${p.status}</td>

            <td>

                <button onclick="sendReminder(
                    '573175308739',
                    '⚠️ Tiene un pago pendiente en AdminBot.'
                )">

                    SEND

                </button>

            </td>
        `;

        table.appendChild(row);

    });
};

window.sendReminder = async (phone, message) => {

    try {

        await request("/send", {

            method: "POST",

            body: JSON.stringify({
                phone,
                message
            })
        });

        Toastify({
            text:"✅ Mensaje enviado",
            duration:2000,
            gravity:"top",
            position:"right",
            style:{
                background:"black",
                color:"#00ff9f",
                border:"1px solid #00ff9f",
                boxShadow:"0 0 10px #00ff9f"
            }
        }).showToast();

    } catch(err){

        console.error(err);

        Toastify({
            text:"❌ Error enviando WhatsApp",
            duration:3000,
            gravity:"top",
            position:"right",
            style:{
                background:"black",
                color:"#ff4b4b",
                border:"1px solid #ff4b4b",
                boxShadow:"0 0 10px #ff4b4b"
            }
        }).showToast();
    }
};

document.getElementById("sendAll")
.addEventListener("click", async () => {

    for (const p of pendingPayments) {

        await sendReminder(
            "573175308739"
        );
    }

    try {

        await request("/send", {
            method:"POST",
            body:JSON.stringify({
                phone,
                message
            })
        });

        Toastify({
            text:"✅ Mensaje enviado",
            duration:2000,
            gravity:"top",
            position:"right",
            style:{
                background: "black",
                color: "#00ff9f",
                border: "1px solid #00ff9f",
                boxShadow: "0 0 10px #00ff9f"
            }
        }).showToast();

    } catch(err){

        Toastify({
            text:"❌ Error enviando WhatsApp",
            duration:3000,
            gravity:"top",
            position:"right",
            style:{
                background: "black",
                color: "#ff4b4b",
                border: "1px solid #ff4b4b",
                boxShadow: "0 0 10px #ff4b4b"
            }
        }).showToast();

    }
});

loadAlerts();