const jwt = require('jsonwebtoken')

const SECRET = 'clave_secreta_peliculas'

function firmarToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' })
}

module.exports = { firmarToken }