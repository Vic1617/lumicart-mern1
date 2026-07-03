import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
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

          <button className="btn btn-primary btn-block product-detail-add" onClick={handleAdd}>
            {added ? 'Added to bag ✓' : `Add to bag — $${product.price}`}
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
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
