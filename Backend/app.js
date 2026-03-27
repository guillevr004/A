import express from "express";

import studentRoutes from "./routes/students.route.js";
import guardianRoutes from "./routes/guardians.route.js";
import paymentRoutes from "./routes/payments.route.js";
import userRoutes from "./routes/users.route.js";
import attendanceRoutes from "./routes/attendances.route.js";
import notificationRoutes from "./routes/notifications.route.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/api", studentRoutes);
app.use("/api", guardianRoutes);
app.use("/api", paymentRoutes);
app.use("/api", userRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", notificationRoutes);

app.get("/", (req, res)=>{
    res.send("Api Funcionando")
});

app.listen(PORT, ()=>{
    console.log("Servidor corriendo LocalHost...")
});