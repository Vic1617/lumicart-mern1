import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { items, loading, updateQty, removeItem, subtotal } = useCart()

  if (loading) {
    return <p className="container section loading-text">Loading your bag...</p>
  }

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
              <li key={item.product} className="cart-row">
                <span>{item.name}</span>
                <div className="cart-row-qty-control">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => updateQty(item.product, Math.max(1, item.qty - 1))}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => updateQty(item.product, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <span>${(item.price * item.qty).toFixed(2)}</span>
                <button className="cart-row-remove" onClick={() => removeItem(item.product)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-block">
            Continue to checkout
          </Link>
        </>
      )}
    </div>
  )
}
