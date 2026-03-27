import express from "express";
import { getGuardian, createGuardian} from "../controllers/guardian.controller.js";

const route = express.Router();

route.get("/guardian", getGuardian);
route.post("/guardian", createGuardian);

export default route;