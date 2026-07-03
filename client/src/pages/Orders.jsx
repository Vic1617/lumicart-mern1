import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMyOrders } from '../services/api'
import './Orders.css'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMyOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container section orders-page">
      <h2>Order history</h2>

      {loading && <p className="loading-text">Loading orders...</p>}
      {error && <div className="auth-error">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className="cart-empty">
          <p>You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn btn-primary">
            Start shopping
          </Link>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="orders-row">
              <div>
                <p className="orders-row-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                <p className="orders-row-date">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <span className={`orders-status orders-status-${order.status}`}>{order.status}</span>
              <span className="orders-row-total">${order.totalPrice.toFixed(2)}</span>
              <Link to={`/orders/${order._id}`} className="btn btn-outline">
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
