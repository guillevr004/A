import express from "express";
import {getUser, createUser} from "../controllers/user.controller.js";


const route = express.Router();

route.get("/user", getUser);
route.post("/user", createUser);

export default route;