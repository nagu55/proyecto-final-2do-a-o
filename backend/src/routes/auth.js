const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()
const SECRET = 'clave_secreta_peliculas'

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
    }

    // Busca el usuario en la base de datos
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // Compara la contraseña ingresada con la encriptada
    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // Genera el token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      SECRET,
      { expiresIn: '8h' }
    )

    res.json({ token, nombre: usuario.nombre, rol: usuario.rol })

  } catch (error) {
    res.status(500).json({ error: 'Error en el login' })
  }
})

module.exports = router