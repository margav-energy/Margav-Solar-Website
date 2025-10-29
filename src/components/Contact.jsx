import React from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from './ScrollAnimation'
import './Contact.css'

const ContactSection = () => {
  return (
    <section className="contact section" id="contact" style={{ paddingTop: 0 }}>
      <div className="contact-background">
        <div className="contact-overlay"></div>
      </div>
      <div className="contact-content container">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <h2 className="contact-title">Join the Movement</h2>
          <p className="contact-description">
            Together we can power a brighter future. Share your story, your projects, and inspire others to choose clean energy.
          </p>
          <div className="contact-buttons">
            <Link to="/schedule" className="btn btn-primary">Get Started →</Link>
            <button className="btn btn-secondary">Learn More →</button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

export default ContactSection

