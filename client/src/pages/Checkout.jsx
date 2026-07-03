import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/api'
import './Checkout.css'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({ address: '', city: '', postalCode: '', country: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const shipping = subtotal > 50 ? 0 : 6
  const total = subtotal + shipping

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const order = await createOrder({ shippingAddress: form, paymentMethod: 'Card on delivery' })
      await clearCart()
      navigate(`/orders/${order._id}`, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container section">
        <p>Your bag is empty, so there's nothing to check out yet.</p>
      </div>
    )
  }

  return (
    <div className="container section checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label htmlFor="address">Street address</label>
            <input id="address" name="address" required value={form.address} onChange={handleChange} />
          </div>
          <div className="auth-field">
            <label htmlFor="city">City</label>
            <input id="city" name="city" required value={form.city} onChange={handleChange} />
          </div>
          <div className="auth-field">
            <label htmlFor="postalCode">Postal code</label>
            <input
              id="postalCode"
              name="postalCode"
              required
              value={form.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="country">Country</label>
            <input id="country" name="country" required value={form.country} onChange={handleChange} />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Placing order...' : `Place order - $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Order summary</h3>
          <ul>
            {items.map((item) => (
              <li key={item.product}>
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="checkout-summary-row checkout-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
