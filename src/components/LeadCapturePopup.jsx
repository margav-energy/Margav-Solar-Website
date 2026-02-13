import React, { useState, useEffect } from 'react'
import { pushToDataLayer } from '../config/gtm'
import './LeadCapturePopup.css'

const LeadCapturePopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})

  // Show popup after delay or on exit intent
  useEffect(() => {
    // Check if user has already submitted or closed the popup
    const hasSeenPopup = localStorage.getItem('leadPopupSeen')
    const hasSubmitted = localStorage.getItem('leadPopupSubmitted')
    
    if (hasSeenPopup || hasSubmitted) {
      return
    }

    // Show popup after 5 seconds
    const delayTimer = setTimeout(() => {
      setIsVisible(true)
      localStorage.setItem('leadPopupSeen', 'true')
    }, 5000)

    // Exit intent detection (mouse leaves top of viewport)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setIsVisible(true)
        localStorage.setItem('leadPopupSeen', 'true')
        clearTimeout(delayTimer)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(delayTimer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!consent) {
      newErrors.consent = 'You must agree to the data usage terms'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Get Google Apps Script Web App URL from environment or config
      const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_SCRIPT_URL_HERE'
      
      if (scriptURL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        console.error('Google Script URL not configured. Please set VITE_GOOGLE_SCRIPT_URL in your .env file.')
        throw new Error('Google Script URL not configured. Please set VITE_GOOGLE_SCRIPT_URL in your .env file.')
      }

      // Build query string for GET request
      const params = new URLSearchParams()
      params.append('name', formData.name)
      params.append('email', formData.email)
      params.append('phone', formData.phone)
      params.append('timestamp', new Date().toISOString())
      params.append('source', 'Lead Capture Popup')

      const fullURL = scriptURL + '?' + params.toString()

      // Use image pixel method (most reliable for Google Apps Script)
      // This method works because it sends a GET request with query parameters
      const img = document.createElement('img')
      img.src = fullURL
      img.style.display = 'none'
      img.onerror = () => {
        // Error is expected for cross-origin requests, but data IS still sent
        // The error happens because we can't read the response, not because the request failed
      }
      document.body.appendChild(img)

      // Clean up after submission
      setTimeout(() => {
        if (document.body.contains(img)) {
          document.body.removeChild(img)
        }
      }, 3000)

      // Track lead submission in GTM
      pushToDataLayer({
        event: 'lead_capture',
        lead_source: 'popup',
        lead_name: formData.name,
        lead_email: formData.email,
        page_path: window.location.pathname
      })

      // Mark as submitted - this prevents popup from showing again
      localStorage.setItem('leadPopupSubmitted', 'true')
      localStorage.setItem('leadPopupSeen', 'true') // Also mark as seen
      
      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: ''
      })
      setConsent(false)

      // Close popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)

    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('leadPopupSeen', 'true')
    // Don't show again if user has submitted
    if (localStorage.getItem('leadPopupSubmitted')) {
      return
    }
  }

  // Don't show popup again if user has already submitted
  useEffect(() => {
    const hasSubmitted = localStorage.getItem('leadPopupSubmitted')
    if (hasSubmitted && !submitStatus) {
      // If submitted but not currently showing success message, hide popup
      setIsVisible(false)
    }
  }, [submitStatus])

  if (!isVisible) return null

  return (
    <div className="lead-popup-overlay" onClick={handleClose}>
      <div className="lead-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="lead-popup-close" onClick={handleClose} aria-label="Close popup">
          ×
        </button>

        <div className="lead-popup-content">
          <h2 className="lead-popup-title">Get Your Free Solar Consultation!</h2>
          <p className="lead-popup-subtitle">
            Discover how much you could save with solar energy. Enter your details below and we'll get in touch.
          </p>

          {submitStatus === 'success' ? (
            <div className="lead-popup-success">
              <div className="success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>We've received your information and will contact you shortly.</p>
            </div>
          ) : (
            <form className="lead-popup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group consent-group">
                <label className="consent-label">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked)
                      if (errors.consent) {
                        setErrors(prev => ({
                          ...prev,
                          consent: ''
                        }))
                      }
                    }}
                    disabled={isSubmitting}
                    className="consent-checkbox"
                  />
                  <span className="consent-text">
                    I agree to the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and consent to MarGav Solar using my personal data (name, email, phone number) for the purpose of contacting me about solar energy solutions and related services. I understand that my data will be stored securely and can be withdrawn at any time.
                  </span>
                </label>
                {errors.consent && <span className="error-message">{errors.consent}</span>}
              </div>

              {submitStatus === 'error' && (
                <div className="error-message general-error">
                  There was an error submitting your information. Please try again or contact us directly.
                </div>
              )}

              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get My Free Consultation →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeadCapturePopup
