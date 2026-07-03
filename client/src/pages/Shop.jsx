import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import './Shop.css'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  const searchTerm = searchParams.get('search') || ''
  const [localSearch, setLocalSearch] = useState(searchTerm)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    const params = {}
    if (category) params.category = category
    if (searchTerm) params.search = searchTerm

    fetchProducts(params)
      .then(setProducts)
      .catch(() => setError('Could not load products right now. Please try again.'))
      .finally(() => setLoading(false))
  }, [category, searchTerm])

  const handleCategoryChange = (id) => {
    const next = new URLSearchParams(searchParams)
    if (id) next.set('category', id)
    else next.delete('category')
    setSearchParams(next)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (localSearch.trim()) next.set('search', localSearch.trim())
    else next.delete('search')
    setSearchParams(next)
  }

  return (
    <div className="container shop-page section">
      <div className="section-header">
        <div>
          <h2>All products</h2>
          <p className="shop-count">
            {loading ? 'Loading...' : `${products.length} ${products.length === 1 ? 'product' : 'products'}`}
            {!loading && searchTerm && (
              <>
                {' '}
                for "<strong>{searchTerm}</strong>"
              </>
            )}
          </p>
        </div>

        <form className="shop-search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search by name or ingredient..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" className="btn btn-outline">
            Search
          </button>
        </form>
      </div>

      <CategoryFilter active={category} onChange={handleCategoryChange} />

      {error && <div className="shop-empty"><p>{error}</p></div>}

      {!error && !loading && products.length > 0 && (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      {!error && !loading && products.length === 0 && (
        <div className="shop-empty">
          <h3>No products match yet</h3>
          <p>Try a different search term, or clear your filters.</p>
        </div>
      )}
    </div>
  )
}
