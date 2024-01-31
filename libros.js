const express = require("express");
const router = express.Router();

const Libro = require("../models/Libro");

const { requireScopes, requiredScopes } = require("express-oauth2-jwt-bearer");

router.get("/", requiredScopes("read:libros"), async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLIbro);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el Libro"});
    }
});

router.put("/:id",requiredScopes("write:libros"), async (req, res) => {
    try {
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
            });
            res.json(Libro);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el Libro"});
   }
});

router.delete("./id", requiredScopes("write:libros"), async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json ({ message: 'LIbro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Libro' });
    }
});

module.exports = router;