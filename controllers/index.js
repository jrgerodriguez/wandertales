const mongoose = require("mongoose");
const { User, Article } = require("../models");
const cloudinary = require('cloudinary').v2;

//Cloudinary for images
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const crearArticulo = async (req, res) => {
    const { 
        'articulo-titulo': titulo,
        'articulo-contenido': contenido
    } = req.body;

    let imagen = null;

    //Funcion para Cloudinary
    if (req.file && req.file.buffer) {
        try {
            await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'WanderTales',  
                    },
                    (error, result) => {
                        if (error) {
                            console.log("Error al subir la imagen a Cloudinary:", error);
                            reject(error);
                        } else {
                            imagen = result.secure_url; 
                            resolve(result);  
                        }
                    }
                );
                stream.end(req.file.buffer); 
            });
        } catch (error) {
            return res.status(500).json({ error: "Error al subir la imagen a Cloudinary" });
        }
    }

    const nuevoArticulo = {
        titulo,
        imagen,
        contenido,
        autor: req.user._id
    }

    if (!nuevoArticulo.titulo || !nuevoArticulo.imagen || !nuevoArticulo.contenido) {
        return res.status(400).json({error: "Faltan algunos campos"})
    }

    try {
        await Article.create(nuevoArticulo)
        res.json({ success: true });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const obtenerArticulos = async (req, res) => {
    try { 
        const articles = await Article.find({})

        if (!articles || articles.length === 0) {
            return res.status(404).json({ message: "No articles found" });
        }

        res.status(200).json(articles)

    } catch (error) {
        console.error("Unable to get Articles:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const obtenerArticulo = async (req, res) => {
    
    try {
        const articulo_id = req.query.id
        const data = await Article.findById(articulo_id)

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No info found" });
        }

        res.status(200).json(data)
    } catch (error) {
        console.error("Unable to get Articles:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

const obtenerUsuario = async (req, res) => {

    try {
        const userId = req.params.autor_id
        const info = await User.findById(userId)

        if (!info) {
            return res.status(404).json({ message: "No info found" });
        }

        res.status(200).json(info)
    } catch (error) {
        console.error("Unable to get Articles:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = {crearArticulo, obtenerArticulos, obtenerArticulo, obtenerUsuario}