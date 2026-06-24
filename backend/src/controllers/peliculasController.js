const prisma = require('../db')

// GET /peliculas - Obtener todas las películas
async function obtenerPeliculas(req, res) {
  try {
    const peliculas = await prisma.pelicula.findMany()
    res.json(peliculas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas' })
  }
}

// GET /peliculas/:id - Obtener una película por ID
async function obtenerPeliculaPorId(req, res) {
  try {
    const pelicula = await prisma.pelicula.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' })
    res.json(pelicula)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la película' })
  }
}

// GET /catalogo - Catálogo público
async function obtenerCatalogo(req, res) {
  try {
    const peliculas = await prisma.pelicula.findMany()
    res.json(peliculas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo' })
  }
}

// POST /peliculas - Crear una película
async function crearPelicula(req, res) {
  try {
    const { titulo, director, anio, genero, precio } = req.body
    const nueva = await prisma.pelicula.create({
      data: { titulo, director, anio: Number(anio), genero, precio: Number(precio) }
    })
    res.status(201).json(nueva)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la película' })
  }
}

// PUT /peliculas/:id - Editar una película
async function editarPelicula(req, res) {
  try {
    const { titulo, director, anio, genero, precio } = req.body
    const actualizada = await prisma.pelicula.update({
      where: { id: Number(req.params.id) },
      data: { titulo, director, anio: Number(anio), genero, precio: Number(precio) }
    })
    res.json(actualizada)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la película' })
  }
}

// DELETE /peliculas/:id - Eliminar una película
async function eliminarPelicula(req, res) {
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
}

module.exports = {
  obtenerPeliculas,
  obtenerPeliculaPorId,
  obtenerCatalogo,
  crearPelicula,
  editarPelicula,
  eliminarPelicula
}