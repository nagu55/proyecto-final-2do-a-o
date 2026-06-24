const express = require('express')
const router = express.Router()
const controlador = require('../controllers/transaccionesController')
const { validarTransaccion } = require('../middlewares/validaciones')

router.post('/', validarTransaccion, controlador.crearTransaccion)
router.get('/', controlador.obtenerTransacciones)

module.exports = router