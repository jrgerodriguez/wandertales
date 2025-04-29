const express = require("express")
const router = express.Router() 
const controller = require("../controllers")
const {isAuthenticated} = require("../middleware/authenticate")
const upload = require("../utilities/multer")

router.post("/crear", isAuthenticated, upload.single("articulo-imagen"), controller.crearArticulo)

router.get("/articulos", controller.obtenerArticulos)

router.get("/articulo", controller.obtenerArticulo)

router.get("/get-user/:autor_id", controller.obtenerUsuario)

module.exports = router
