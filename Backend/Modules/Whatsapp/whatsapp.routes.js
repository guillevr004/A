import Routes, { Router } from "express"
import { sendMessage } from "./whatsapp.controller.js"

const router = Router()

router.post("/send", sendMessage)

export default router;