import { Link } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-body">
        <p className="eyebrow">{product.size}</p>
        <h3>{product.name}</h3>
        <p className="product-card-tagline">{product.tagline}</p>
        <div className="product-card-meta">
          <span className="product-card-rating">★ {product.rating.toFixed(1)}</span>
          <span className="product-card-price">${product.price}</span>
        </div>
      </div>
    </Link>
  )
}
