function mostrarPanelAdmin(nombre) {
  document.getElementById('panel-admin').style.display = 'flex'
  document.getElementById('btn-login').style.display = 'none'
  document.getElementById('info-admin').style.display = 'flex'
  if (nombre) document.getElementById('nombre-admin').textContent = `👤 ${nombre}`
}

function ocultarPanelAdmin() {
  document.getElementById('panel-admin').style.display = 'none'
  document.getElementById('btn-login').style.display = 'inline-block'
  document.getElementById('info-admin').style.display = 'none'
}

function renderizarTablaAdmin(peliculas) {
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
        <button class="btn-eliminar" onclick="eliminarPeliculaUI(${pelicula.id})">Eliminar</button>
      </td>
    `
    tbody.appendChild(fila)
  })
}

function renderizarTablaTransacciones(transacciones) {
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

function prepararFormularioEdicion(id, titulo, director, anio, genero, precio) {
  document.getElementById('pelicula-id').value = id
  document.getElementById('titulo').value = titulo
  document.getElementById('director').value = director
  document.getElementById('anio').value = anio
  document.getElementById('genero').value = genero
  document.getElementById('precio').value = precio
  document.getElementById('form-titulo').textContent = 'Editar Película'
  document.getElementById('btn-cancelar').style.display = 'inline-block'
}

function limpiarFormularioPelicula() {
  document.getElementById('pelicula-id').value = ''
  document.getElementById('titulo').value = ''
  document.getElementById('director').value = ''
  document.getElementById('anio').value = ''
  document.getElementById('genero').value = ''
  document.getElementById('precio').value = ''
  document.getElementById('form-titulo').textContent = 'Agregar Película'
  document.getElementById('btn-cancelar').style.display = 'none'
}