const express = require('express')
const cors = require('cors')
const peliculasRouter = require('./routes/peliculas')
const authRouter = require('./routes/auth')
const transaccionesRouter = require('./routes/transacciones')
const peliculasController = require('./controllers/peliculasController')
const { verificarToken } = require('./auth/verificarToken')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Rutas públicas
app.use('/auth', authRouter)
app.use('/transacciones', transaccionesRouter)
app.get('/catalogo', peliculasController.obtenerCatalogo)

// Rutas protegidas (solo admin)
app.use('/peliculas', verificarToken, peliculasRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})