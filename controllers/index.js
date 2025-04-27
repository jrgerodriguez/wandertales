const mongoose = require("mongoose");
const { Article } = require("../models");


const crearArticulo = async (req, res) => {
    const { 
        'articulo-titulo': titulo,
        'articulo-imagen': imagen,
        'articulo-contenido': contenido
      } = req.body;

    const nuevoArticulo = {
        titulo,
        imagen,
        contenido,
        autor: req.user._id
    }

    console.log(nuevoArticulo)

    if (!nuevoArticulo.titulo || !nuevoArticulo.imagen || !nuevoArticulo.contenido) {
        return res.status(400).json({error: "Faltan algunos campos"})
    }

    try {
        await Article.create(nuevoArticulo)
        res.status(201).json({message: "Nuevo articulo agregado"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {crearArticulo}