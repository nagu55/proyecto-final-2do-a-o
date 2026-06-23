
const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
// GET /peliculas - Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await prisma.pelicula.findMany()
    res.json(peliculas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas' })
  }
})

// GET /peliculas/:id - Obtener una película por ID
router.get('/:id', async (req, res) => {
  try {
    const pelicula = await prisma.pelicula.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' })
    res.json(pelicula)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la película' })
  }
})

// POST /peliculas - Crear una película
router.post('/', async (req, res) => {
  try {
    const { titulo, director, anio, genero, precio } = req.body
    if (!titulo || !director || !anio || !genero || precio === undefined) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }
    const nueva = await prisma.pelicula.create({
      data: { titulo, director, anio: Number(anio), genero, precio: Number(precio) }
    })
    res.status(201).json(nueva)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la película' })
  }
})

// PUT /peliculas/:id - Editar una película
router.put('/:id', async (req, res) => {
  try {
    const { titulo, director, anio, genero, precio } = req.body
    if (!titulo || !director || !anio || !genero || precio === undefined) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }
    const actualizada = await prisma.pelicula.update({
      where: { id: Number(req.params.id) },
      data: { titulo, director, anio: Number(anio), genero, precio: Number(precio) }
    })
    res.json(actualizada)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la película' })
  }
})
// DELETE /peliculas/:id - Eliminar una película
router.delete('/:id', async (req, res) => {
  try {
    await prisma.pelicula.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ mensaje: 'Película eliminada correctamente' })
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(400).json({
        error: 'No se puede eliminar esta película porque tiene alquileres o compras registradas'
      })
    }
    res.status(500).json({ error: 'Error al eliminar la película' })
  }
})
module.exports = router

