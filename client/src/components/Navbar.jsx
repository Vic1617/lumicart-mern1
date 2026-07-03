import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories } from '../data/categories'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const navigate = useNavigate()
  const { count } = useCart()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setAccountOpen(false)
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : '/shop')
    setMenuOpen(false)
  }

  return (
    <header className="nav">
      <div className="nav-top container">
        <button
          className="nav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="nav-logo">
          Lumi<span className="italic-accent">Cart</span>
        </Link>

        <form className="nav-search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search serums, SPF, ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Submit search">
            <SearchIcon />
          </button>
        </form>

        <div className="nav-actions">
          <div className="nav-account">
            <button
              className="nav-icon-link"
              aria-label="Account menu"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((v) => !v)}
            >
              <UserIcon />
            </button>
            {accountOpen && (
              <div className="nav-account-dropdown">
                {user ? (
                  <>
                    <p className="nav-account-greeting">Hi, {user.name.split(' ')[0]}</p>
                    <Link to="/orders" onClick={() => setAccountOpen(false)}>
                      Order history
                    </Link>
                    <button onClick={handleLogout}>Log out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setAccountOpen(false)}>
                      Log in
                    </Link>
                    <Link to="/register" onClick={() => setAccountOpen(false)}>
                      Create account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <Link to="/cart" className="nav-icon-link nav-cart" aria-label="View bag">
            <BagIcon />
            {count > 0 && <span className="nav-cart-count">{count}</span>}
          </Link>
        </div>
      </div>

      <nav className={`nav-categories ${menuOpen ? 'is-open' : ''}`}>
        <div className="container nav-categories-inner">
          <Link to="/shop" onClick={() => setMenuOpen(false)}>
            All Products
          </Link>
          {categories.map((c) => (
            <Link key={c.id} to={`/shop?category=${c.id}`} onClick={() => setMenuOpen(false)}>
              {c.label}
            </Link>
          ))}
          <form className="nav-search nav-search-mobile" onSubmit={handleSearch} role="search">
            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" aria-label="Submit search">
              <SearchIcon />
            </button>
          </form>
        </div>
      </nav>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}
