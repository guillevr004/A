import express from "express";
import { getPayment, createPayment} from "../controllers/payment.controller.js";


const route = express.Router();

route.get("/payment", getPayment);
route.post("/payment", createPayment);

export default route;