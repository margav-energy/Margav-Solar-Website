import React from 'react'
import ProductsSection from '../components/Products'
import ScrollAnimation from '../components/ScrollAnimation'
import PromoBanner from '../components/PromoBanner'
import './ProductsPage.css'

const Products = () => {
  return (
    <section className="products-page">
      <PromoBanner />
      <div className="products-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="products-page-title">Our Products</h1>
            <p className="products-page-intro">
              Explore our range of solar energy solutions and battery storage systems designed for UK properties.
            </p>
          </ScrollAnimation>
        </div>
      </div>
      <ProductsSection />
    </section>
  )
}

export default Products

