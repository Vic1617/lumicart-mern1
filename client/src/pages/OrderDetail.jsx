import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchOrderById } from '../services/api'
import './OrderDetail.css'

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOrderById(id)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="container section loading-text">Loading order...</p>
  if (error) return <p className="container section auth-error">{error}</p>
  if (!order) return null

  return (
    <div className="container section order-detail-page">
      <p className="breadcrumb">
        <Link to="/orders">Order history</Link> / #{order._id.slice(-8).toUpperCase()}
      </p>

      <h2>Order confirmed</h2>
      <p className="order-detail-sub">
        Placed on{' '}
        {new Date(order.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        &nbsp;·&nbsp; Status: <strong>{order.status}</strong>
      </p>

      <div className="order-detail-grid">
        <div>
          <h3>Items</h3>
          <ul className="order-detail-items">
            {order.orderItems.map((item) => (
              <li key={item.product}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p className="order-detail-item-meta">
                    Qty {item.qty} × ${item.price}
                  </p>
                </div>
                <span>${(item.qty * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-detail-side">
          <div className="order-detail-box">
            <h3>Shipping to</h3>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>

          <div className="order-detail-box">
            <h3>Total</h3>
            <div className="order-detail-total-row">
              <span>Items</span>
              <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="order-detail-total-row">
              <span>Shipping</span>
              <span>{order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice.toFixed(2)}`}</span>
            </div>
            <div className="order-detail-total-row order-detail-grand-total">
              <span>Total</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
