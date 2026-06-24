const API_URL = 'http://localhost:3000'

async function obtenerCatalogo() {
  const respuesta = await fetch(`${API_URL}/catalogo`)
  return respuesta.json()
}

async function obtenerPeliculasAdmin(token) {
  const respuesta = await fetch(`${API_URL}/peliculas`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return respuesta
}

async function crearPelicula(datos, token) {
  return fetch(`${API_URL}/peliculas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datos)
  })
}

async function editarPelicula(id, datos, token) {
  return fetch(`${API_URL}/peliculas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datos)
  })
}

async function eliminarPelicula(id, token) {
  return fetch(`${API_URL}/peliculas/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
}