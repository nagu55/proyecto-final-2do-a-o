function renderizarCatalogo(peliculas) {
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