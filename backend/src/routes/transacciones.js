const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// POST /transacciones - Registrar alquiler o compra
router.post('/', async (req, res) => {
  try {
    const { tipo, peliculaId, nombreCliente } = req.body

    if (!tipo || !peliculaId || !nombreCliente) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    if (tipo !== 'alquiler' && tipo !== 'compra') {
      return res.status(400).json({ error: 'El tipo debe ser alquiler o compra' })
    }

    // Verifica que la película exista
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
})

// GET /transacciones - Ver todas las transacciones (solo admin)
router.get('/', async (req, res) => {
  try {
    const transacciones = await prisma.transaccion.findMany({
      include: {
        pelicula: true
      }
    })
    res.json(transacciones)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las transacciones' })
  }
})

module.exports = router