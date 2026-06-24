const API_URL_TRANSACCIONES = 'http://localhost:3000'

async function crearTransaccion(tipo, peliculaId, nombreCliente) {
  return fetch(`${API_URL_TRANSACCIONES}/transacciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, peliculaId, nombreCliente })
  })
}

async function obtenerTransacciones(token) {
  const respuesta = await fetch(`${API_URL_TRANSACCIONES}/transacciones`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return respuesta.json()
}
