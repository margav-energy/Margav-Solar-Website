import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import './Hero.css'

const Hero = () => {
  // Debug: Log the image path to verify import
  console.log('Hero image path:', heroImage)
  
  return (
    <section className="hero" id="home" style={{ scrollMarginTop: '80px' }}>
      <div className="hero-background">
        <img 
          src={heroImage} 
          alt="Solar panels on modern house" 
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content container">
        <h1 className="hero-title">
          Powering a Greener Future for UK Homes
        </h1>
        <p className="hero-description">
          Expert consultancy and installation of solar panels, and battery storage solutions for all types of UK properties.
        </p>
        <div className="hero-buttons">
          <Link to="/schedule" className="btn btn-primary">
            Get Started →
          </Link>
          <button className="btn btn-secondary">
            Learn More →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
