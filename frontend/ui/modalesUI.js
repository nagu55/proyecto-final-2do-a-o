// ─── MODAL LOGIN ──────────────────────────────────────────────────────────────

function abrirModalLogin() {
  document.getElementById('modal-login').style.display = 'flex'
  document.getElementById('login-error').style.display = 'none'
  document.getElementById('login-email').value = ''
  document.getElementById('login-password').value = ''
}

function cerrarModalLogin() {
  document.getElementById('modal-login').style.display = 'none'
}

function mostrarErrorLogin() {
  document.getElementById('login-error').style.display = 'block'
}

// ─── MODAL TRANSACCIÓN ────────────────────────────────────────────────────────

function abrirModalTransaccion(id, titulo, tipo) {
  document.getElementById('transaccion-peliculaId').value = id
  document.getElementById('transaccion-tipo').value = tipo
  document.getElementById('transaccion-nombre').value = ''
  document.getElementById('transaccion-error').style.display = 'none'
  document.getElementById('modal-transaccion-titulo').textContent =
    tipo === 'alquiler' ? '🎬 Alquilar Película' : '🛒 Comprar Película'
  document.getElementById('modal-pelicula-nombre').textContent = titulo
  document.getElementById('modal-transaccion').style.display = 'flex'
}

function cerrarModalTransaccion() {
  document.getElementById('modal-transaccion').style.display = 'none'
}

function mostrarErrorTransaccion() {
  document.getElementById('transaccion-error').style.display = 'block'
}