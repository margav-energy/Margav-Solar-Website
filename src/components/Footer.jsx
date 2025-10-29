import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../assets/logo.png'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to top visibility
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
    // Add your newsletter subscription logic here
  }

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-main">
          {/* Left Section: Company Information */}
          <div className="footer-section footer-company">
            <Link to="/" className="footer-logo">
              <img src={logoImage} alt="MarGav Solar" className="footer-logo-image" />
            </Link>
            <p className="footer-description">
              Transforming UK properties of all types into energy-efficient, sustainable homes through expert consultancy and professional installation services.
            </p>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <span className="footer-icon">📍</span>
                <span>7-8, Kimberley Business Park, Kimberley Way, Rugeley WS15 1RE</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">📞</span>
                <a href="tel:01889256069">01889 256069</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">✉️</span>
                <a href="mailto:sales@margav.energy">sales@margav.energy</a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/work">Work</Link>
              <Link to="/products">Products</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/request-quote">Request a Quote</Link>
              <Link to="/schedule">Schedule →</Link>
            </nav>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <nav className="footer-nav">
              <Link to="/products">Solar Panels</Link>
              <Link to="/products">Battery Storage</Link>
              <Link to="/products">Energy Consultancy</Link>
              <Link to="/products">Maintenance</Link>
            </nav>
          </div>

          {/* Right Section: Newsletter & Social */}
          <div className="footer-section footer-right">
            <div className="footer-newsletter">
              <h4 className="footer-heading">Stay Updated</h4>
              <p className="footer-newsletter-text">
                Subscribe to our newsletter for energy efficiency tips and updates.
              </p>
              <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input"
                  required
                />
                <button type="submit" className="footer-newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="footer-social">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="footer-social-icons">
                <a 
                  href="https://www.facebook.com/people/Margav-Solar/61581971564867/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Facebook"
                >
                  <span className="social-icon-text">f</span>
                </a>
                <a 
                  href="https://www.instagram.com/margav.solar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Instagram"
                >
                  <span className="social-icon-text">📷</span>
                </a>
              </div>
            </div>

            <div className="footer-language">
              <label htmlFor="language-select" className="footer-language-label">Language:</label>
              <select id="language-select" className="footer-language-select">
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} MarGav Solar. All rights reserved.
          </p>
          <div className="footer-policies">
            <a href="#privacy" className="footer-policy-link">Privacy Policy</a>
            <span className="footer-policy-separator">|</span>
            <a href="#terms" className="footer-policy-link">Terms of Service</a>
            <span className="footer-policy-separator">|</span>
            <a href="#cookies" className="footer-policy-link">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="footer-scroll-top" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <span className="scroll-top-arrow">↑</span>
        </button>
      )}
    </footer>
  )
}

export default Footer
