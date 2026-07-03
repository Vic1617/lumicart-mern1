import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchProductById, fetchProducts } from '../services/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetchProductById(id)
      .then((data) => {
        setProduct(data)
        return fetchProducts({ category: data.category })
      })
      .then((data) => {
        setRelated(data.filter((p) => p._id !== id).slice(0, 4))
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/product/${id}` } } })
      return
    }
    setError('')
    try {
      await addItem(product)
      setAdded(true)
      setTimeout(() => setAdded(false), 1800)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <p className="container section loading-text">Loading product...</p>
  }

  if (notFound || !product) {
    return (
      <div className="container section">
        <p>We couldn't find that product.</p>
        <Link to="/shop" className="btn btn-outline">
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="container section product-detail">
      <p className="breadcrumb">
        <Link to="/shop">Shop</Link> / {product.name}
      </p>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <p className="eyebrow">{product.size}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-rating">
            ★ {product.rating.toFixed(1)} &nbsp;·&nbsp; {product.reviews} reviews
          </p>
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-tagline">{product.tagline}</p>
          <p className="product-detail-desc">{product.description}</p>

          <div className="product-detail-ingredients">
            <p className="eyebrow">Key ingredients</p>
            <ul>
              {product.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="btn btn-primary btn-block product-detail-add" onClick={handleAdd}>
            {added ? 'Added to bag ✓' : `Add to bag - $${product.price}`}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <div className="section-header">
            <h2>You might also like</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
