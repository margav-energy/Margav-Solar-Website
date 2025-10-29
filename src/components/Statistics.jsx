import React from 'react'
import ScrollAnimation from './ScrollAnimation'
import './Statistics.css'

const Statistics = () => {
  const stats = [
    {
      value: '250kWh',
      description: 'Homes built with sustainable materials have increased by 30%.'
    },
    {
      value: '60%',
      description: 'Client satisfaction ratings have reached 95%.'
    },
    {
      value: '1%',
      description: 'Solar installations have grown by 40% in two years.'
    }
  ]

  return (
    <section className="statistics section" id="statistics">
      <div className="container">
        <div className="statistics-content">
          <ScrollAnimation animation="fadeInRight" delay={0}>
            <div className="statistics-left">
              <h2 className="statistics-title">
                Better Technology.<br />Higher Conversion.
              </h2>
              <p className="statistics-subtitle">
                Our residences generate up to 50% more energy than they consume.
              </p>
              
              <div className="statistics-image">
                <div className="statistics-image-placeholder">
                  <div className="building-logo">
                    <div className="logo-bar"></div>
                    <div className="logo-bar"></div>
                    <div className="logo-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <div className="statistics-right">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} animation="fadeInLeft" delay={index * 200}>
                <div className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <p className="stat-description">{stat.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics

