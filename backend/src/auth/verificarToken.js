const jwt = require('jsonwebtoken')

const SECRET = 'clave_secreta_peliculas'

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token requerido' })
  }

  try {
    const datos = jwt.verify(token, SECRET)
    req.usuario = datos
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' })
  }
}

module.exports = { verificarToken }