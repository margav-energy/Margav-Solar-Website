import React from 'react'
import { Link } from 'react-router-dom'
import './PromoBanner.css'

const PromoBanner = ({ variant = 'default' }) => {
  return (
    <div className={`promo-banner ${variant === 'no-margin' ? 'promo-banner-no-margin' : ''}`}>
      <div className="promo-banner-content">
        <div className="promo-banner-marquee">
          <div className="promo-marquee-content">
            <span className="promo-badge">DECEMBER PROMO</span>
            <span className="promo-message">
              Free battery storage with every solar installation this December!
            </span>
            <span className="promo-badge">DECEMBER PROMO</span>
            <span className="promo-message">
              Free battery storage with every solar installation this December!
            </span>
            <span className="promo-badge">DECEMBER PROMO</span>
            <span className="promo-message">
              Free battery storage with every solar installation this December!
            </span>
          </div>
        </div>
        <Link to="/schedule" className="promo-cta">
          Get Your Quote →
        </Link>
      </div>
    </div>
  )
}

export default PromoBanner

