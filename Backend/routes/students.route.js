import express from "express";
import { getStudent, createStudent, updateStudent, deleteStudent } from "../controllers/student.controller.js";

const route = express.Router();

route.get("/students", getStudent);
route.post("/students", createStudent);
route.put("/students/:id", updateStudent);
route.delete("/students/:id", deleteStudent);

export default route;


