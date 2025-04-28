const express = require("express")
const router = express.Router() 
const controller = require("../controllers")
const {isAuthenticated} = require("../middleware/authenticate")
const upload = require("../utilities/multer")

router.post("/crear", isAuthenticated, upload.single("articulo-imagen"), controller.crearArticulo)

module.exports = router
