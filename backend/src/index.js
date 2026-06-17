const express = require('express')
const cors = require('cors')
const peliculasRouter = require('./routes/peliculas')
const authRouter = require('./routes/auth')
const transaccionesRouter = require('./routes/transacciones')
const { verificarToken } = require('./middleware')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Rutas públicas
app.use('/auth', authRouter)
app.use('/transacciones', transaccionesRouter)

// Rutas protegidas (solo admin)
app.use('/peliculas', verificarToken, peliculasRouter)

// Ruta pública para ver el catálogo
app.get('/catalogo', async (req, res) => {
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()
  try {
    const peliculas = await prisma.pelicula.findMany()
    res.json(peliculas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:3000`)
})