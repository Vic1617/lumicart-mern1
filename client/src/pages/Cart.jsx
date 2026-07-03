import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { items } = useCart()
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="container section cart-page">
      <h2>Your bag</h2>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your bag is empty for now.</p>
          <Link to="/shop" className="btn btn-primary">
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-row">
                <span>{item.name}</span>
                <span className="cart-row-qty">x{item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="cart-note">
            Checkout, authentication, and order history connect once the Express + MongoDB
            backend lands in Phase 2.
          </p>
        </>
      )}
    </div>
  )
}
