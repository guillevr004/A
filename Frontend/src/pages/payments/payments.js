import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { request } from "../../shared/js/api.js";

const table = document.getElementById("paymentsTable");

const loadPayments = async () => {

    try {

        const data = await request("/payment");

        renderPayments(data);

    } catch (err) {
        console.error(err);
    }

};

const renderPayments = (payments) => {

    table.innerHTML = "";

    payments.forEach(p => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.amount_paid}</td>
            <td>${p.payment_method}</td>
            <td>${p.status}</td>

            <td>
                <button class="pay-btn"
                    onclick="markAsPaid('${p.id}')">
                    PAY
                </button>

                <button class="pending-btn"
                    onclick="markAsPending('${p.id}')">
                    PENDING
                </button>
            </td>
        `;

        table.appendChild(row);

    });

};

window.markAsPaid = async (id) => {

    await request(`/payment/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            status: "paid"
        })
    });

    Toastify({
        text: "✅ Pago marcado como pagado",
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

    loadPayments();

};

window.markAsPending = async (id) => {

    await request(`/payment/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            status: "pending"
        })
    });

    Toastify({
        text: "⚠️ Pago pendiente",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
            background: "black",
            color: "#ffb700",
            border: "1px solid #ffb700",
            boxShadow: "0 0 10px #ffb700"
        }
    }).showToast();

    loadPayments();

};

loadPayments();