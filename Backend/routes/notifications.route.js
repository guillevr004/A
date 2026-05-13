import express from "express";
import { getNotification, createNotification} from "../controllers/notification.controller.js";
import { sendMessage } from "../Modules/Whatsapp/whatsapp.controller.js";

const route = express.Router();

route.get("/notification", getNotification);
route.post("/notification", createNotification);
route.post("/send-whatsapp", sendMessage);

export default route;