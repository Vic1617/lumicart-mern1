// Central place for every call to the Express API.
// In development this points at your local server; in production it points
// at wherever you deploy the backend (set via VITE_API_URL).

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getToken() {
  const stored = localStorage.getItem('lumicart_user')
  if (!stored) return null
  try {
    return JSON.parse(stored).token
  } catch {
    return null
  }
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`)
  }

  return data
}

// ---- Auth ----
export const registerUser = (payload) => request('/auth/register', { method: 'POST', body: payload })
export const loginUser = (payload) => request('/auth/login', { method: 'POST', body: payload })
export const getProfile = () => request('/auth/profile', { auth: true })
export const updateProfile = (payload) =>
  request('/auth/profile', { method: 'PUT', body: payload, auth: true })

// ---- Products ----
export const fetchProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString()
  return request(`/products${query ? `?${query}` : ''}`)
}
export const fetchProductById = (id) => request(`/products/${id}`)

// ---- Cart ----
export const fetchCart = () => request('/cart', { auth: true })
export const addToCartApi = (productId, qty = 1) =>
  request('/cart', { method: 'POST', body: { productId, qty }, auth: true })
export const updateCartItemApi = (productId, qty) =>
  request(`/cart/${productId}`, { method: 'PUT', body: { qty }, auth: true })
export const removeCartItemApi = (productId) =>
  request(`/cart/${productId}`, { method: 'DELETE', auth: true })
export const clearCartApi = () => request('/cart', { method: 'DELETE', auth: true })

// ---- Orders ----
export const createOrder = (payload) =>
  request('/orders', { method: 'POST', body: payload, auth: true })
export const fetchMyOrders = () => request('/orders/myorders', { auth: true })
export const fetchOrderById = (id) => request(`/orders/${id}`, { auth: true })
