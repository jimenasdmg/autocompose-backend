const express = require("express");
const router = express.Router();

const db = require("../firebase/config");

router.get("/", async (req, res) => {

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