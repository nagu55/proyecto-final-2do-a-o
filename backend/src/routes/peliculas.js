const express = require('express')
const router = express.Router()
const controlador = require('../controllers/peliculasController')
const { validarPelicula } = require('../middlewares/validaciones')

router.get('/', controlador.obtenerPeliculas)
router.get('/:id', controlador.obtenerPeliculaPorId)
router.post('/', validarPelicula, controlador.crearPelicula)
router.put('/:id', validarPelicula, controlador.editarPelicula)
router.delete('/:id', controlador.eliminarPelicula)

module.exports = router