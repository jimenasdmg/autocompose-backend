const express = require("express");
const router = express.Router();

const db = require("../firebase/config");

/*
    GET TODAS LAS ALERTAS
*/
router.get("/", async (req, res) => {

    try {

        const snapshot = await db
            .collection("alertas")
            .get();

        const alertas = [];

        snapshot.forEach(doc => {

            alertas.push({
                id: doc.id,
                ...doc.data()
            });

        });

        res.json(alertas);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/*
    CREAR ALERTA
*/
router.post("/", async (req, res) => {

    try {

        const nuevaAlerta = {
            userId: req.body.userId,
            marca: req.body.marca,
            precioMin: req.body.precioMin,
            precioMax: req.body.precioMax,
            creadaEn: new Date()
        };

        const docRef = await db
            .collection("alertas")
            .add(nuevaAlerta);

        res.status(201).json({
            mensaje: "Alerta creada correctamente",
            id: docRef.id
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.get("/usuario/:userId", async (req, res) => {

    try {

        const snapshot = await db
            .collection("alertas")
            .where("userId", "==", req.params.userId)
            .get();

        const alertas = [];

        snapshot.forEach(doc => {
            alertas.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.json(alertas);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/*
    ELIMINAR ALERTA
*/
router.delete("/:id", async (req, res) => {

    try {

        await db
            .collection("alertas")
            .doc(req.params.id)
            .delete();

        res.json({
            mensaje: "Alerta eliminada correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;