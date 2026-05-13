import express from "express";

import {
    getPayment,
    createPayment,
    updatePayment,
    updatePaymentStatus
} from "../controllers/payment.controller.js";

const route = express.Router();

route.get("/payment", getPayment);
route.post("/payment", createPayment);
route.put("/payment/:id", updatePayment);
route.put("/payment/:id", updatePaymentStatus);

export default route;