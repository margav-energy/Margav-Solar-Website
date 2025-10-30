import React from 'react'
import { Link } from 'react-router-dom'
import solarPanelImage from '../assets/solar panel.png'
import evChargerImage from '../assets/ev charger.png'
import batteryImage from '../assets/battery.png'
import './Services.css'

const Services = () => {
  const services = [
    {
      title: 'Solar Panels',
      subtitle:
        'High-efficiency solar panel systems designed for all UK property types. Our installations preserve architectural integrity while maximizing energy generation and return on investment.',
      image: { src: solarPanelImage, alt: 'Solar panels installed on UK property' },
      bullets: [
        'Custom mounting solutions',
        'All property types expertise',
        'Industry leading warranties'
      ],
      cta: { label: 'Learn More', to: '/schedule' }
    },
    {
      title: 'Battery Storage',
      subtitle:
        'Smart battery storage systems that store excess solar energy for use during peak times, reducing reliance on the grid and maximizing savings for any property type.',
      image: { src: batteryImage, alt: 'Home battery storage unit' },
      bullets: [
        'Lithium-ion technology',
        'Smart energy management',
        'Peak-time optimization'
      ],
      cta: { label: 'Learn More', to: '/schedule' }
    },
    {
      title: 'EV Chargers',
      subtitle:
        'Professional electric vehicle charging point installations for residential and commercial properties, providing fast, safe, and reliable charging solutions for the future of transportation.',
      image: { src: evChargerImage, alt: 'EV charger installed at home' },
      bullets: [
        'Fast charging capabilities',
        'Smart charging technology',
        'OZEV approved installations',
        'Home and commercial solutions'
      ],
      cta: { label: 'Learn More', to: '/schedule' }
    }
  ]

  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="services-header">
          <span className="services-label">OUR SERVICES</span>
          <h2 className="services-title">Comprehensive energy solutions tailored for all UK properties</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image-wrapper">
                <img src={service.image.src} alt={service.image.alt} className="service-image" />
              </div>
              <h3 className="service-title">{service.title}<span className="title-dot">.</span></h3>
              {service.subtitle && (
                <p className="service-subtitle">{service.subtitle}</p>
              )}
              <ul className="service-bullets checklist">
                {service.bullets.map((b, i) => (
                  <li key={i} className="service-bullet"><span className="tick" aria-hidden="true">✔</span>{b}</li>
                ))}
              </ul>
              <div className="service-actions">
                <Link to={service.cta.to} className="btn btn-discover">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services


