import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Home.css'

export default function Home() {
  const bestsellers = products.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Formulated in small batches</p>
            <h1>
              Skincare that <span className="italic-accent">tells you</span> what's
              actually in the bottle.
            </h1>
            <p className="hero-sub">
              No fragrance oils hiding behind "parfum." No 47-step routines. Just
              dermatologist-reviewed formulas, dosed at the concentrations that
              actually work.
            </p>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-primary">
                Shop bestsellers
              </Link>
              <Link to="/shop?category=hydration" className="btn btn-outline">
                Start with hydration
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-blob">
              <img
                src="/images/dew-serum.jpg"
                alt="LumiCart hero skincare product"
              />
            </div>
            <div className="hero-floating-card">
              <p className="eyebrow">Bestseller</p>
              <p className="hero-floating-name">Dew Drop Serum</p>
              <p className="hero-floating-rating">★ 4.8 (612 reviews)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by concern */}
      <section className="section container">
        <div className="section-header">
          <h2>Shop by concern</h2>
        </div>
        <div className="concern-grid">
          {categories.map((c) => (
            <Link key={c.id} to={`/shop?category=${c.id}`} className="concern-card">
              <span>{c.label}</span>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section container">
        <div className="section-header">
          <h2>
            Currently <span className="italic-accent">bestselling</span>
          </h2>
          <Link to="/shop" className="btn btn-outline">
            View all products
          </Link>
        </div>
        <div className="product-grid">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Brand band */}
      <section className="brand-band">
        <div className="container brand-band-inner">
          <p className="eyebrow">Since day one</p>
          <h2>
            We formulate first, <span className="italic-accent">market second.</span>
          </h2>
          <p>
            Every LumiCart formula starts with a percentage, not a promise. We publish
            our actives, skip the ones that only look good on packaging, and test on
            real skin before anything ships.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Explore the full range
          </Link>
        </div>
      </section>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
