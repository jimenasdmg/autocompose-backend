const express = require("express");
const router = express.Router();
const db = require("../firebase/config");

router.get("/", async (req, res) => {
    console.log("GET /mensajes");
    try {
        const snapshot = await db
              .collection("mensajes")
              .get();
        const mensajes = [];
        snapshot.forEach(doc => {
            mensajes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/:usuario1/:usuario2", async (req, res) => {
    const { usuario1, usuario2 } = req.params;
    console.log(`GET /mensajes/${usuario1}/${usuario2}`);
    try {
        const { usuario1, usuario2 } = req.params;
        const snapshot = await db
            .collection("mensajes")
            .get();
        const mensajes = [];
        snapshot.forEach(doc => {
            const mensaje = doc.data();
            const esConversacion =
                (
                    mensaje.remitenteId === usuario1 &&
                    mensaje.receptorId === usuario2
                ) ||
                (
                    mensaje.remitenteId === usuario2 &&
                    mensaje.receptorId === usuario1
                );
            if (esConversacion) {
                mensajes.push({
                    id: doc.id,
                    ...mensaje
                });
            }
        });
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    console.log("POST /mensajes");
    try {
        const nuevoMensaje = {
            remitenteId: req.body.remitenteId,
            receptorId: req.body.receptorId,
            contenido: req.body.contenido,
            fecha: new Date()
        };
        const docRef = await db
            .collection("mensajes")
            .add(nuevoMensaje);
        res.status(201).json({
            mensaje: "Mensaje enviado correctamente",
            id: docRef.id
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
module.exports = router;

/*
| GET MENSAJE POR ID
*/
router.get("/:id", async (req, res) => {
    console.log(`GET /mensajes/${req.params.id}`);
    try {
        const doc = await db
            .collection("mensajes")
            .doc(req.params.id)
            .get();
        if (!doc.exists) {
            return res.status(404).json({
                mensaje: "Mensaje no encontrado"
            });
        }
        res.json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

/*
| PUT ACTUALIZAR MENSAJE
*/
router.put("/:id", async (req, res) => {
    console.log(`PUT /mensajes/${req.params.id}`);
    try {
        await db
            .collection("mensajes")
            .doc(req.params.id)
            .update(req.body);
        res.json({
            mensaje: "Mensaje actualizado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});