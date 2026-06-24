function guardarToken(token) {
  localStorage.setItem('token', token)
}

function obtenerToken() {
  return localStorage.getItem('token')
}

function eliminarToken() {
  localStorage.removeItem('token')
}