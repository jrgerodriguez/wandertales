const express = require("express")
const router = express.Router() 
const controller = require("../controllers")
const {isAuthenticated} = require("../middleware/authenticate")

router.post("/crear", isAuthenticated, controller.crearArticulo)

module.exports = router
