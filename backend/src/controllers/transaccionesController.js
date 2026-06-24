const prisma = require('../db')

// POST /transacciones - Registrar alquiler o compra
async function crearTransaccion(req, res) {
  try {
    const { tipo, peliculaId, nombreCliente } = req.body

    const pelicula = await prisma.pelicula.findUnique({
      where: { id: Number(peliculaId) }
    })

    if (!pelicula) {
      return res.status(404).json({ error: 'Película no encontrada' })
    }

    const transaccion = await prisma.transaccion.create({
      data: {
        tipo,
        peliculaId: Number(peliculaId),
        usuarioId: 1, // Admin por defecto
        nombreCliente
      }
    })

    res.status(201).json(transaccion)

  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la transacción' })
  }
}

// GET /transacciones - Ver todas las transacciones (solo admin)
async function obtenerTransacciones(req, res) {
  try {
    const transacciones = await prisma.transaccion.findMany({
      include: { pelicula: true }
    })
    res.json(transacciones)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las transacciones' })
  }
}

module.exports = { crearTransaccion, obtenerTransacciones }