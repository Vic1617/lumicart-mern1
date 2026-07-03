import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import * as api from '../services/api'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Whenever the logged-in user changes, load their cart from the server.
  // Logging out clears the cart from view (it's still saved server-side).
  useEffect(() => {
    if (!user) {
      setItems([])
      return
    }
    setLoading(true)
    api
      .fetchCart()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [user])

  const addItem = async (product, qty = 1) => {
    if (!user) {
      throw new Error('You need to be logged in to add items to your bag.')
    }
    const updated = await api.addToCartApi(product._id, qty)
    setItems(updated)
  }

  const updateQty = async (productId, qty) => {
    const updated = await api.updateCartItemApi(productId, qty)
    setItems(updated)
  }

  const removeItem = async (productId) => {
    const updated = await api.removeCartItemApi(productId)
    setItems(updated)
  }

  const clearCart = async () => {
    const updated = await api.clearCartApi()
    setItems(updated)
  }

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])

  const value = { items, loading, addItem, updateQty, removeItem, clearCart, count, subtotal }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside a CartProvider')
  return ctx
}
