import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goShop(cat) {
    setMenuOpen(false);
    navigate(cat ? `/shop?cat=${encodeURIComponent(cat)}` : "/shop");
  }

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap header-inner">
        <Link className="logo" to="/" onClick={() => setMenuOpen(false)}>
          <span className="mark">C</span>cleanlab
        </Link>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <button onClick={() => goShop()}>Shop</button>
          <button onClick={() => goShop("Protein")}>Protein</button>
          <button onClick={() => goShop("Pre-workout")}>Pre-workout</button>
        </nav>

        <div className="head-right">
          <button className="ghost-link" onClick={() => navigate("/admin")}>
          Admin
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Switch theme" title="Switch theme">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>
          <button className="icon-btn" onClick={openCart} aria-label="Open cart">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && <span className="badge show">{itemCount}</span>}
          </button>
          <button className="icon-btn burger" onClick={() => setMenuOpen((m) => !m)} aria-label="Menu">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
