import express from "express";
import { getNotification, createNotification} from "../controllers/notification.controller.js";


const route = express.Router();

route.get("/notification", getNotification);
route.post("/notification", createNotification);

export default route;