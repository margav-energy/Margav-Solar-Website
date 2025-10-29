import React from 'react'
import FeaturesSection from '../components/Features'
import ScrollAnimation from '../components/ScrollAnimation'
import './Work.css'

const Work = () => {
  return (
    <section className="work-page">
      <div className="work-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="work-page-title">Our Work</h1>
            <p className="work-page-intro">
              Discover innovative energy solutions and smart home technology designed to transform how you power your property.
            </p>
          </ScrollAnimation>
        </div>
      </div>
      <FeaturesSection />
    </section>
  )
}

export default Work

