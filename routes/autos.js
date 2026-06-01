const express = require("express");
const router = express.Router();

const db = require("../firebase/config");

/*
|--------------------------------------------------------------------------
| GET TODOS LOS AUTOS
|--------------------------------------------------------------------------
*/
router.get("/", async (req, res) => {

    try {

        const snapshot = await db
            .collection("autos")
            .get();

        const autos = [];

        snapshot.forEach(doc => {
            autos.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.json(autos);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


/*
|--------------------------------------------------------------------------
| POST NUEVO AUTO
|--------------------------------------------------------------------------
*/
router.post("/", async (req, res) => {

    try {

        const nuevoAuto = {
            vendedorId: req.body.vendedorId,
            marca: req.body.marca,
            modelo: req.body.modelo,
            version: req.body.version,
            anio: req.body.anio,
            color: req.body.color,
            kilometraje: req.body.kilometraje,
            transmision: req.body.transmision,
            equipamiento: req.body.equipamiento,
            sistemaAsistencia: req.body.sistemaAsistencia,
            propietarios: req.body.propietarios,
            precio: req.body.precio,
            ubicacion: req.body.ubicacion,
            descripcion: req.body.descripcion,
            imageUrls: req.body.imageUrls || [],
            creadoEn: new Date()
        };

        const docRef = await db
            .collection("autos")
            .add(nuevoAuto);

        res.status(201).json({
            mensaje: "Auto registrado correctamente",
            id: docRef.id
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


/*
|--------------------------------------------------------------------------
| GET AUTOS DE UN VENDEDOR
|--------------------------------------------------------------------------
*/
router.get("/vendedor/:vendedorId", async (req, res) => {

    try {

        const snapshot = await db
            .collection("autos")
            .where("vendedorId", "==", req.params.vendedorId)
            .get();

        const autos = [];

        snapshot.forEach(doc => {
            autos.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.json(autos);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


/*
|--------------------------------------------------------------------------
| GET AUTO POR ID
|--------------------------------------------------------------------------
*/
router.get("/:id", async (req, res) => {

    try {

        const doc = await db
            .collection("autos")
            .doc(req.params.id)
            .get();

        if (!doc.exists) {

            return res.status(404).json({
                mensaje: "Auto no encontrado"
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
|--------------------------------------------------------------------------
| PUT ACTUALIZAR AUTO
|--------------------------------------------------------------------------
*/
router.put("/:id", async (req, res) => {

    try {

        await db
            .collection("autos")
            .doc(req.params.id)
            .update(req.body);

        res.json({
            mensaje: "Auto actualizado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


/*
|--------------------------------------------------------------------------
| DELETE ELIMINAR AUTO
|--------------------------------------------------------------------------
*/
router.delete("/:id", async (req, res) => {

    try {

        await db
            .collection("autos")
            .doc(req.params.id)
            .delete();

        res.json({
            mensaje: "Auto eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;