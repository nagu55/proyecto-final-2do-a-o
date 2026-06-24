let token = obtenerToken()

// ─── INICIO ───────────────────────────────────────────────────────────────────

window.onload = async () => {
  await cargarCatalogo()
  if (token) {
    mostrarPanelAdmin()
    await cargarTablaAdminUI()
    await cargarTransaccionesUI()
  }
}

// ─── CATÁLOGO ─────────────────────────────────────────────────────────────────

async function cargarCatalogo() {
  const peliculas = await obtenerCatalogo()
  renderizarCatalogo(peliculas)
}

// ─── TRANSACCIONES ────────────────────────────────────────────────────────────

function abrirTransaccion(id, titulo, tipo) {
  abrirModalTransaccion(id, titulo, tipo)
}

function cerrarTransaccion() {
  cerrarModalTransaccion()
}

async function confirmarTransaccion() {
  const peliculaId = document.getElementById('transaccion-peliculaId').value
  const tipo = document.getElementById('transaccion-tipo').value
  const nombreCliente = document.getElementById('transaccion-nombre').value.trim()

  if (!nombreCliente) {
    mostrarErrorTransaccion()
    return
  }

  const respuesta = await crearTransaccion(tipo, peliculaId, nombreCliente)

  if (respuesta.ok) {
    cerrarTransaccion()
    alert(`✅ ${tipo === 'alquiler' ? 'Alquiler' : 'Compra'} registrada con éxito`)
  } else {
    alert('Error al registrar la transacción')
  }
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

function abrirLogin() {
  abrirModalLogin()
}

function cerrarLogin() {
  cerrarModalLogin()
}

async function iniciarSesion() {
  const email = document.getElementById('login-email').value.trim()
  const password = document.getElementById('login-password').value.trim()

  const respuesta = await login(email, password)

  if (respuesta.ok) {
    const datos = await respuesta.json()
    token = datos.token
    guardarToken(token)
    cerrarLogin()
    mostrarPanelAdmin(datos.nombre)
    await cargarTablaAdminUI()
    await cargarTransaccionesUI()
  } else {
    mostrarErrorLogin()
  }
}

function cerrarSesion() {
  token = null
  eliminarToken()
  ocultarPanelAdmin()
}

// ─── PANEL ADMIN ──────────────────────────────────────────────────────────────

async function cargarTablaAdminUI() {
  const respuesta = await obtenerPeliculasAdmin(token)

  if (respuesta.status === 401 || respuesta.status === 403) {
    cerrarSesion()
    return
  }

  const peliculas = await respuesta.json()
  renderizarTablaAdmin(peliculas)
}

async function cargarTransaccionesUI() {
  const transacciones = await obtenerTransacciones(token)
  renderizarTablaTransacciones(transacciones)
}

// ─── CRUD PELÍCULAS ───────────────────────────────────────────────────────────

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
    await editarPelicula(id, datos, token)
  } else {
    await crearPelicula(datos, token)
  }

  limpiarFormularioPelicula()
  await cargarTablaAdminUI()
  await cargarCatalogo()
}

function prepararEdicion(id, titulo, director, anio, genero, precio) {
  prepararFormularioEdicion(id, titulo, director, anio, genero, precio)
}

function cancelarEdicion() {
  limpiarFormularioPelicula()
}

async function eliminarPeliculaUI(id) {
  if (!confirm('¿Estás seguro de que querés eliminar esta película?')) return

  const respuesta = await eliminarPelicula(id, token)

  if (respuesta.ok) {
    await cargarTablaAdminUI()
    await cargarCatalogo()
  } else {
    const datos = await respuesta.json()
    alert(datos.error || 'Error al eliminar la película')
  }
}