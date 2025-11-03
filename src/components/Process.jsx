import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from './ScrollAnimation'
import consultationImage from '../assets/Consultation.png'
import assessmentImage from '../assets/Property Assessment & Quotation.png'
import energyPlanImage from '../assets/Energy Plan.png'
import gallery3 from '../assets/gallery_3.png'
import gallery6 from '../assets/gallery_6.png'
import './Process.css'

const Process = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const listRef = useRef(null)
  const itemRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      image: gallery6
    },
    {
      number: '5',
      title: 'Aftercare & Support',
      description: 'Ongoing maintenance and support to ensure your energy system performs optimally for years to come.',
      buttonText: 'Get Support →',
      image: gallery3
    }
  ]

  // Use effect to recalculate offset when activeStep or isMobile changes
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    const calculateOffset = () => {
      if (!isMobile || !listRef.current || !itemRef.current) {
        setScrollOffset(0)
        return
      }
      
      // Force a reflow to ensure measurements are accurate after class changes
      void listRef.current.offsetHeight
      void itemRef.current.offsetHeight
      
      // Get all step items to measure accurately
      const allItems = listRef.current.querySelectorAll('.process-step-item')
      if (allItems.length === 0) {
        setScrollOffset(0)
        return
      }
      
      const listWidth = listRef.current.scrollWidth || listRef.current.offsetWidth
      // Get width from the item that matches current view (first item for measurement)
      const firstItemWidth = allItems[0].offsetWidth
      const gap = 8 // gap between items
      
      // Calculate offset based on activeStep
      // Since each item has width (100vw - 96px) / 3 when activeStep > 0
      // And width (100vw - 80px) / 2 when activeStep === 0
      // Requirements:
      // - Step 1 (index 0): show [1, 2] (indices 0, 1)
      // - Step 2 (index 1): show [2, 3, 4] (indices 1, 2, 3)
      // - Step 3 (index 2): show [3, 4, 5] (indices 2, 3, 4)
      // - Step 4 (index 3): show [4, 5] (indices 3, 4) - last two
      // - Step 5 (index 4): show [4, 5] (indices 3, 4) - last two
      let offset = 0
      if (activeStep === 0) {
        offset = 0 // Show [0, 1] - no offset needed
      } else if (activeStep === 1) {
        // Show [1, 2, 3] (indices 1, 2, 3) - move by 1 item to show item 1 at start
        offset = firstItemWidth + gap
      } else if (activeStep === 2) {
        // Show [2, 3, 4] (indices 2, 3, 4) which is steps 3, 4, 5 - move by 2 items
        offset = (firstItemWidth + gap) * 2
      } else {
        // Step 4 or 5 (index 3 or 4): show [3, 4] (indices 3, 4) which is steps 4, 5
        // Move by 3 items to show item 3 at start
        offset = (firstItemWidth + gap) * 3
      }
      
      setScrollOffset((offset / listWidth) * 100)
    }
    
    // Small delay to ensure DOM is updated after class changes
    const timer = setTimeout(calculateOffset, 100)
    return () => clearTimeout(timer)
  }, [activeStep, isMobile, steps.length])

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
            <div className="process-steps-list-wrapper">
              <div 
                ref={listRef}
                className={`process-steps-list ${activeStep === 0 ? 'initial-view' : ''}`}
                style={{
                  '--total-steps': steps.length,
                  transform: isMobile ? `translateX(-${scrollOffset}%)` : 'none'
                }}
              >
                {steps.map((step, index) => (
                  <button
                    key={index}
                    ref={index === 0 ? (el) => { if (el) itemRef.current = el } : undefined}
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

