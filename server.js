const express = require("express");
const cors = require("cors");

const autosRoutes = require("./routes/autos");
const mensajesRoutes = require("./routes/mensajes");
const alertasRoutes = require("./routes/alertas");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API AutoCompose funcionando");
});

app.use("/autos", autosRoutes);
app.use("/mensajes", mensajesRoutes);
app.use("/alertas", alertasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});