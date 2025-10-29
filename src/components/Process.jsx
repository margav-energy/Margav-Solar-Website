import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from './ScrollAnimation'
import consultationImage from '../assets/Consultation.png'
import assessmentImage from '../assets/Property Assessment & Quotation.png'
import energyPlanImage from '../assets/Energy Plan.png'
import installationImage from '../assets/Installation.png'
import aftercareImage from '../assets/Aftercare & Support.png'
import './Process.css'

const Process = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: '1',
      title: 'Book Consultation',
      description: 'Schedule a free, no-obligation consultation to discuss your energy needs and property requirements.',
      buttonText: 'Schedule Now →',
      image: consultationImage
    },
    {
      number: '2',
      title: 'Property Assessment & Quotation',
      description: 'Our experts conduct a thorough assessment of your property and provide a detailed, personalized quotation.',
      buttonText: 'Learn More →',
      image: assessmentImage
    },
    {
      number: '3',
      title: 'Custom Energy Plan',
      description: 'We design a tailored energy solution that meets your specific needs while respecting your property\'s character and requirements.',
      buttonText: 'View Plans →',
      image: energyPlanImage
    },
    {
      number: '4',
      title: 'Professional Installation',
      description: 'Our certified technicians carry out the installation with minimal disruption to your daily routine.',
      buttonText: 'Contact Us →',
      image: installationImage
    },
    {
      number: '5',
      title: 'Aftercare & Support',
      description: 'Ongoing maintenance and support to ensure your energy system performs optimally for years to come.',
      buttonText: 'Get Support →',
      image: aftercareImage
    }
  ]

  return (
    <section className="process section" id="process">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="process-header">
            <h2 className="process-main-title">Our Process</h2>
            <p className="process-subtitle">A streamlined journey from consultation to installation</p>
          </div>
        </ScrollAnimation>

        <div className="process-content">
          <div className="process-sidebar">
            <h3 className="process-sidebar-title">Our Process</h3>
            <div className="process-steps-list">
              {steps.map((step, index) => (
                <button
                  key={index}
                  className={`process-step-item ${activeStep === index ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                >
                  {step.number === '1' && 'Consultation'}
                  {step.number === '2' && 'Assessment'}
                  {step.number === '3' && 'Energy Plan'}
                  {step.number === '4' && 'Installation'}
                  {step.number === '5' && 'Aftercare'}
                </button>
              ))}
            </div>
          </div>

          <div className="process-main">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`process-step ${activeStep === index ? 'active' : ''}`}
              >
                <div className="process-step-content">
                  <span className="process-step-number">{step.number}</span>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-description">{step.description}</p>
                  <Link to="/schedule" className="btn btn-primary">{step.buttonText}</Link>
                </div>
                <div className="process-step-image">
                  <div className="process-image-wrapper">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="process-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process

