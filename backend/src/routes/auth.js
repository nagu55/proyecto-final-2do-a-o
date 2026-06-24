const express = require('express')
const router = express.Router()
const controlador = require('../controllers/authController')
const { validarLogin } = require('../middlewares/validaciones')

router.post('/login', validarLogin, controlador.login)

module.exports = router