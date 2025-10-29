import React from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from './ScrollAnimation'
import './Products.css'

const ProductsSection = () => {
  const products = [
    {
      name: 'Home Unit 600W',
      description: 'A utility-scale workhorse designed for decades of highly efficient electrical output. Designed for residential solar installations.',
      watts: '600W'
    },
    {
      name: 'Commercial Array',
      description: 'Scalable commercial solutions for businesses looking to reduce energy costs and carbon footprint.',
      watts: 'Custom'
    }
  ]

  return (
    <section className="products section" id="products" style={{ paddingTop: 0 }}>
      <div className="products-content">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="products-text">
            <h3 className="products-subtitle">Elevate Your Living</h3>
            <h2 className="products-title">
              Tomorrow's energy is being designed today with clean power and sustainable supply chains.
            </h2>
            <p className="products-tagline">Because the future runs on energy.</p>
            <div className="products-buttons">
              <Link to="/schedule" className="btn btn-primary">Get Started →</Link>
              <button className="btn btn-secondary">Learn More →</button>
            </div>
          </div>
        </ScrollAnimation>

        <div className="products-grid">
          {products.map((product, index) => (
            <ScrollAnimation key={index} animation="scaleIn" delay={index * 200}>
              <div className="product-card">
              <div className="product-image">
                <div className="product-image-placeholder">
                  <div className="product-panels">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="panel"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <button className="product-link">
                  <span>Learn More</span>
                  <span className="arrow">→</span>
                </button>
              </div>
            </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection

