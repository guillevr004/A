import express from "express";
import bycrypt from "bcrypt";
import cors from "cors";

import studentsRoutes from "./routes/students.route.js";
import guardianRoutes from "./routes/guardians.route.js";
import paymentRoutes from "./routes/payments.route.js";
import userRoutes from "./routes/users.route.js";
import attendanceRoutes from "./routes/attendances.route.js";
import notificationRoutes from "./routes/notifications.route.js";
import authRoutes from "./routes/auth.route.js"
import dashboardRoutes from "./routes/dashboard.route.js"

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
const PORT = 3000;

app.use("/api", studentsRoutes);   
app.use("/api", guardianRoutes);
app.use("/api", paymentRoutes);
app.use("/api", userRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", notificationRoutes);
app.use("/api", authRoutes);
app.use("/api", dashboardRoutes);
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: "Endpoint no encontrado",
        path: req.originalUrl
    });
});

app.get("/", (req, res)=>{
    res.send("Api Funcionando")
});

// const passwordlist = [
//     "joel123",
//     "juan123",
//     "andres123",
//     "alejandro123",
//     "guillermo123"
// ]

// for(let i = 0; i < passwordlist.length; i++){
//     const hash = await bycrypt.hash(passwordlist[i], 10)
//     console.log(`Contraseña: ${passwordlist[i]}, hash: ${hash}`) 
// }

app.listen(PORT, ()=>{
    console.log("Servidor corriendo LocalHost...")
});