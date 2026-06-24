const prisma = require('../db')
const bcrypt = require('bcryptjs')
const { firmarToken } = require('../auth/firmarToken')

// POST /auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const token = firmarToken({ id: usuario.id, email: usuario.email, rol: usuario.rol })

    res.json({ token, nombre: usuario.nombre, rol: usuario.rol })

  } catch (error) {
    res.status(500).json({ error: 'Error en el login' })
  }
}

module.exports = { login }