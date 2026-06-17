const API_URL = 'http://localhost:3000'
let token = localStorage.getItem('token') || null

// ─── INICIO ───────────────────────────────────────────────────────────────────

window.onload = () => {
  cargarCatalogo()
  if (token) mostrarPanelAdmin()
}

// ─── CATÁLOGO PÚBLICO ─────────────────────────────────────────────────────────

async function cargarCatalogo() {
  const respuesta = await fetch(`${API_URL}/catalogo`)
  const peliculas = await respuesta.json()

  const catalogo = document.getElementById('catalogo')
  catalogo.innerHTML = ''

  if (peliculas.length === 0) {
    catalogo.innerHTML = '<p style="color:rgba(255,255,255,0.4)">No hay películas disponibles.</p>'
    return
  }

  peliculas.forEach(pelicula => {
    const card = document.createElement('div')
    card.className = 'card-pelicula'
    card.innerHTML = `
      <h3>${pelicula.titulo}</h3>
      <p>🎬 ${pelicula.director}</p>
      <p>📅 ${pelicula.anio} &nbsp;|&nbsp; 🎭 ${pelicula.genero}</p>
      <p class="precio">$${pelicula.precio}</p>
      <div class="card-botones">
        <button class="btn-alquilar" onclick="abrirTransaccion(${pelicula.id}, '${pelicula.titulo}', 'alquiler')">Alquilar</button>
        <button class="btn-comprar" onclick="abrirTransaccion(${pelicula.id}, '${pelicula.titulo}', 'compra')">Comprar</button>
      </div>
    `
    catalogo.appendChild(card)
  })
}

// ─── TRANSACCIONES ────────────────────────────────────────────────────────────

function abrirTransaccion(id, titulo, tipo) {
  document.getElementById('transaccion-peliculaId').value = id
  document.getElementById('transaccion-tipo').value = tipo
  document.getElementById('transaccion-nombre').value = ''
  document.getElementById('transaccion-error').style.display = 'none'
  document.getElementById('modal-transaccion-titulo').textContent =
    tipo === 'alquiler' ? '🎬 Alquilar Película' : '🛒 Comprar Película'
  document.getElementById('modal-pelicula-nombre').textContent = titulo
  document.getElementById('modal-transaccion').style.display = 'flex'
}

function cerrarTransaccion() {
  document.getElementById('modal-transaccion').style.display = 'none'
}

async function confirmarTransaccion() {
  const peliculaId = document.getElementById('transaccion-peliculaId').value
  const tipo = document.getElementById('transaccion-tipo').value
  const nombreCliente = document.getElementById('transaccion-nombre').value.trim()

  if (!nombreCliente) {
    document.getElementById('transaccion-error').style.display = 'block'
    return
  }

  const respuesta = await fetch(`${API_URL}/transacciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, peliculaId, nombreCliente })
  })

  if (respuesta.ok) {
    cerrarTransaccion()
    alert(`✅ ${tipo === 'alquiler' ? 'Alquiler' : 'Compra'} registrada con éxito`)
  } else {
    alert('Error al registrar la transacción')
  }
}

// ─── LOGIN ADMIN ──────────────────────────────────────────────────────────────

function abrirLogin() {
  document.getElementById('modal-login').style.display = 'flex'
  document.getElementById('login-error').style.display = 'none'
  document.getElementById('login-email').value = ''
  document.getElementById('login-password').value = ''
}

function cerrarLogin() {
  document.getElementById('modal-login').style.display = 'none'
}

async function iniciarSesion() {
  const email = document.getElementById('login-email').value.trim()
  const password = document.getElementById('login-password').value.trim()

  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (respuesta.ok) {
    const datos = await respuesta.json()
    token = datos.token
    localStorage.setItem('token', token)
    cerrarLogin()
    mostrarPanelAdmin(datos.nombre)
  } else {
    document.getElementById('login-error').style.display = 'block'
  }
}

function cerrarSesion() {
  token = null
  localStorage.removeItem('token')
  document.getElementById('panel-admin').style.display = 'none'
  document.getElementById('btn-login').style.display = 'inline-block'
  document.getElementById('info-admin').style.display = 'none'
}

// ─── PANEL ADMIN ──────────────────────────────────────────────────────────────

function mostrarPanelAdmin(nombre) {
  document.getElementById('panel-admin').style.display = 'flex'
  document.getElementById('btn-login').style.display = 'none'
  document.getElementById('info-admin').style.display = 'flex'
  if (nombre) document.getElementById('nombre-admin').textContent = `👤 ${nombre}`
  cargarTablaAdmin()
  cargarTransacciones()
}

async function cargarTablaAdmin() {
  const respuesta = await fetch(`${API_URL}/peliculas`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })

  if (respuesta.status === 401 || respuesta.status === 403) {
    cerrarSesion()
    return
  }

  const peliculas = await respuesta.json()
  const tbody = document.getElementById('tabla-admin')
  tbody.innerHTML = ''

  peliculas.forEach(pelicula => {
    const fila = document.createElement('tr')
    fila.innerHTML = `
      <td>${pelicula.id}</td>
      <td>${pelicula.titulo}</td>
      <td>${pelicula.director}</td>
      <td>${pelicula.anio}</td>
      <td>${pelicula.genero}</td>
      <td>$${pelicula.precio}</td>
      <td>
        <button class="btn-editar" onclick="prepararEdicion(${pelicula.id}, '${pelicula.titulo}', '${pelicula.director}', ${pelicula.anio}, '${pelicula.genero}', ${pelicula.precio})">Editar</button>
        <button class="btn-eliminar" onclick="eliminarPelicula(${pelicula.id})">Eliminar</button>
      </td>
    `
    tbody.appendChild(fila)
  })
}

async function cargarTransacciones() {
  const respuesta = await fetch(`${API_URL}/transacciones`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const transacciones = await respuesta.json()
  const tbody = document.getElementById('tabla-transacciones')
  tbody.innerHTML = ''

  transacciones.forEach(t => {
    const fila = document.createElement('tr')
    fila.innerHTML = `
      <td>${t.id}</td>
      <td>${t.nombreCliente}</td>
      <td>${t.pelicula.titulo}</td>
      <td>${t.tipo === 'alquiler' ? '🎬 Alquiler' : '🛒 Compra'}</td>
      <td>${new Date(t.createdAt).toLocaleDateString('es-AR')}</td>
    `
    tbody.appendChild(fila)
  })
}

// ─── CRUD PELÍCULAS (ADMIN) ───────────────────────────────────────────────────

async function guardarPelicula() {
  const id = document.getElementById('pelicula-id').value
  const titulo = document.getElementById('titulo').value.trim()
  const director = document.getElementById('director').value.trim()
  const anio = document.getElementById('anio').value.trim()
  const genero = document.getElementById('genero').value.trim()
  const precio = document.getElementById('precio').value.trim()

  if (!titulo || !director || !anio || !genero || !precio) {
    alert('Todos los campos son obligatorios')
    return
  }

  const datos = { titulo, director, anio: Number(anio), genero, precio: Number(precio) }

  if (id) {
    await fetch(`${API_URL}/peliculas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(datos)
    })
  } else {
    await fetch(`${API_URL}/peliculas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(datos)
    })
  }

  limpiarFormulario()
  cargarTablaAdmin()
  cargarCatalogo()
}

function prepararEdicion(id, titulo, director, anio, genero, precio) {
  document.getElementById('pelicula-id').value = id
  document.getElementById('titulo').value = titulo
  document.getElementById('director').value = director
  document.getElementById('anio').value = anio
  document.getElementById('genero').value = genero
  document.getElementById('precio').value = precio
  document.getElementById('form-titulo').textContent = 'Editar Película'
  document.getElementById('btn-cancelar').style.display = 'inline-block'
}

function cancelarEdicion() {
  limpiarFormulario()
}

async function eliminarPelicula(id) {
  if (!confirm('¿Estás seguro de que querés eliminar esta película?')) return

  await fetch(`${API_URL}/peliculas/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })

  cargarTablaAdmin()
  cargarCatalogo()
}

function limpiarFormulario() {
  document.getElementById('pelicula-id').value = ''
  document.getElementById('titulo').value = ''
  document.getElementById('director').value = ''
  document.getElementById('anio').value = ''
  document.getElementById('genero').value = ''
  document.getElementById('precio').value = ''
  document.getElementById('form-titulo').textContent = 'Agregar Película'
  document.getElementById('btn-cancelar').style.display = 'none'
}