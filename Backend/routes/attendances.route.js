import express from "express";
import { getAttendance, createAttendance} from "../controllers/attendance.controller.js";


const route = express.Router();

route.get("/attendance", getAttendance);
route.post("/attendance", createAttendance);

export default route;