import React from 'react'
import ContactSection from '../components/Contact'
import ScrollAnimation from '../components/ScrollAnimation'
import './ContactPage.css'

const Contact = () => {
  return (
    <section className="contact-page">
      <div className="contact-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="contact-page-title">Get In Touch</h1>
            <p className="contact-page-intro">
              Ready to make the switch to solar energy? Contact us today for a free consultation and discover how we can help power your property sustainably.
            </p>
          </ScrollAnimation>
        </div>
      </div>
      <ContactSection />
    </section>
  )
}

export default Contact

