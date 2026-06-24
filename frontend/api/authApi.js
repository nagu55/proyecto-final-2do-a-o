const API_URL_AUTH = 'http://localhost:3000'

async function login(email, password) {
  return fetch(`${API_URL_AUTH}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
}