import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../assets/logo.png'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logoImage} alt="Margav Solar Logo" className="logo-image" />
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>About</Link>
          <Link to="/work" className={`nav-link ${location.pathname === '/work' ? 'active' : ''}`} onClick={closeMenu}>Work</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} onClick={closeMenu}>Products</Link>
          <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`} onClick={closeMenu}>Blog</Link>
          <Link to="/request-quote" className={`nav-link ${location.pathname === '/request-quote' ? 'active' : ''}`} onClick={closeMenu}>Request a Quote</Link>
          <Link to="/schedule" className={`nav-button schedule-button ${location.pathname === '/schedule' ? 'active' : ''}`} onClick={closeMenu}>
            Schedule →
          </Link>
        </nav>

        <button 
          className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  )
}

export default Header

