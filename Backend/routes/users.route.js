import express from "express";
import { getUsers, createUser, updateUser, deleteUser, searchUser } from "../controllers/user.controller.js";


const route = express.Router();

route.get("/users", getUsers);
route.post("/users", createUser);
route.put("/users/:id", updateUser);
route.delete("/users/:id", deleteUser);
route.get("/users/search", searchUser);

export default route;