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
              {/* <Link to="/work">Work</Link> */}
              {/* <Link to="/products">Products</Link> */}
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
                  {/* Facebook official glyph */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.06h3.128V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.646h-3.123V24h6.127C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/margav-energy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="LinkedIn"
                >
                  {/* LinkedIn official glyph */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11.846 20H3.692V9h3.462v11zM5.5 7.654c-1.108 0-2.004-.898-2.004-2.006 0-1.108.896-2.004 2.004-2.004 1.108 0 2.006.896 2.006 2.004 0 1.108-.898 2.006-2.006 2.006zM20.308 20h-3.462v-5.746c0-1.369-.027-3.129-1.907-3.129-1.909 0-2.201 1.492-2.201 3.031V20h-3.462V9h3.324v1.507h.047c.463-.877 1.595-1.803 3.283-1.803 3.511 0 4.159 2.312 4.159 5.316V20z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/margav.solar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Instagram"
                >
                  {/* Instagram official glyph */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608C4.533 1.927 5.8 1.639 7.166 1.577 8.432 1.519 8.812 1.507 12 1.507m0-1.507C8.741 0 8.332.013 7.052.072 5.771.131 4.659.428 3.68 1.407 2.701 2.386 2.404 3.498 2.345 4.779 2.287 6.059 2.274 6.468 2.274 9.727v4.546c0 3.259.013 3.668.071 4.948.059 1.281.356 2.393 1.335 3.372.979.979 2.091 1.276 3.372 1.335 1.28.058 1.689.071 4.948.071s3.668-.013 4.948-.071c1.281-.059 2.393-.356 3.372-1.335.979-.979 1.276-2.091 1.335-3.372.058-1.28.071-1.689.071-4.948V9.727c0-3.259-.013-3.668-.071-4.948-.059-1.281-.356-2.393-1.335-3.372C20.393.428 19.281.131 18 .072 16.72.013 16.311 0 13.053 0H12z"/>
                    <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.186a4.024 4.024 0 1 1 0-8.048 4.024 4.024 0 0 1 0 8.048z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                  </svg>
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
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {new Date().getFullYear()} <span className="text-gradient">MarGav</span> <span style={{ color: 'var(--color-blue)' }}>Solar</span>. All rights reserved.
            </p>
            <div className="footer-company-info">
              <p className="footer-company-details">
                MargavSolar is a trading style of Margav Renewables Ltd
              </p>
              <p className="footer-company-details">
                Margav Renewables Ltd | Company Number: 12580649 | Registered in England & Wales
              </p>
            </div>
          </div>
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
