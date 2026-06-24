// Valida los datos de una película antes de crear o editar
function validarPelicula(req, res, next) {
  const { titulo, director, anio, genero, precio } = req.body

  if (!titulo || !director || !anio || !genero || precio === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  if (typeof titulo !== 'string' || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título no puede estar vacío' })
  }

  if (typeof director !== 'string' || director.trim() === '') {
    return res.status(400).json({ error: 'El director no puede estar vacío' })
  }

  if (isNaN(Number(anio))) {
    return res.status(400).json({ error: 'El año debe ser un número válido' })
  }

  if (isNaN(Number(precio))) {
    return res.status(400).json({ error: 'El precio debe ser un número válido' })
  }

  next()
}

// Valida los datos de login
function validarLogin(req, res, next) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
  }

  next()
}

// Valida los datos de una transacción (alquiler/compra)
function validarTransaccion(req, res, next) {
  const { tipo, peliculaId, nombreCliente } = req.body

  if (!tipo || !peliculaId || !nombreCliente) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  if (tipo !== 'alquiler' && tipo !== 'compra') {
    return res.status(400).json({ error: 'El tipo debe ser alquiler o compra' })
  }

  next()
}

module.exports = { validarPelicula, validarLogin, validarTransaccion }