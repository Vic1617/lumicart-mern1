import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import './Shop.css'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  const searchTerm = searchParams.get('search') || ''
  const [localSearch, setLocalSearch] = useState(searchTerm)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = !category || p.category === category
      const matchesSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ingredients.some((i) => i.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
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
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {searchTerm && (
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

      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="shop-empty">
          <h3>No products match yet</h3>
          <p>Try a different search term, or clear your filters.</p>
        </div>
      )}
    </div>
  )
}
