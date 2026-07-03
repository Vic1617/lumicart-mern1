import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="nav-logo footer-logo">
            Lumi<span className="italic-accent">Cart</span>
          </p>
          <p className="footer-tagline">
            Skincare built around ingredients you can actually pronounce.
          </p>
        </div>

        <div className="footer-col">
          <p className="eyebrow">Shop</p>
          <Link to="/shop?category=hydration">Hydration</Link>
          <Link to="/shop?category=brightening">Brightening</Link>
          <Link to="/shop?category=barrier">Barrier Repair</Link>
          <Link to="/shop?category=spf">SPF</Link>
        </div>

        <div className="footer-col">
          <p className="eyebrow">Support</p>
          <Link to="/">Contact Us</Link>
          <Link to="/">Shipping &amp; Returns</Link>
          <Link to="/">FAQ</Link>
        </div>

        <div className="footer-col">
          <p className="eyebrow">Company</p>
          <Link to="/">Our Story</Link>
          <Link to="/">Ingredients Glossary</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} LumiCart. Final project build — MERN stack.</p>
      </div>
    </footer>
  )
}
