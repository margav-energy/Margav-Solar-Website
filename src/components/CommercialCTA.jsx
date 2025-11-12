import React, { useState, useEffect, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import ScrollAnimation from './ScrollAnimation'
import {
  EMAILJS_COMMERCIAL_LUCY_SERVICE_ID,
  EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID,
  EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY
} from '../config/emailjs'
import './CommercialCTA.css'

const CommercialCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    telephone: '',
    preferredTime: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Note: EmailJS will be initialized before each email send with the appropriate public key
  // This allows us to use two separate EmailJS accounts (one for sales@margav.energy, one for lucy@margav.energy)

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

  const openModal = () => {
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }, [])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Telephone number is required'
    }
    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time of contact is required'
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
    setErrorMessage('')

    try {
      // Validate EmailJS configuration for Lucy's account
      // Check if values exist, are not empty, and are not placeholder strings
      const lucyConfigValid = 
        EMAILJS_COMMERCIAL_LUCY_SERVICE_ID &&
        typeof EMAILJS_COMMERCIAL_LUCY_SERVICE_ID === 'string' &&
        EMAILJS_COMMERCIAL_LUCY_SERVICE_ID.trim() !== '' &&
        EMAILJS_COMMERCIAL_LUCY_SERVICE_ID !== 'YOUR_LUCY_SERVICE_ID' &&
        EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID &&
        typeof EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID === 'string' &&
        EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID.trim() !== '' &&
        EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID !== 'YOUR_LUCY_TEMPLATE_ID' &&
        EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY &&
        typeof EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY === 'string' &&
        EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY.trim() !== '' &&
        EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY !== 'YOUR_LUCY_PUBLIC_KEY'

      if (!lucyConfigValid) {
        console.error('EmailJS configuration missing. Please set Commercial CTA EmailJS credentials in your .env file.')
        console.error('Lucy Config:', {
          serviceId: EMAILJS_COMMERCIAL_LUCY_SERVICE_ID,
          templateId: EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID,
          hasKey: !!EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY
        })
        setSubmitStatus('error')
        setErrorMessage('Email configuration missing. Please contact the website administrator.')
        setIsSubmitting(false)
        return
      }

      // Format preferred time for display
      const timeDisplayMap = {
        '8am-11am': '8am - 11am',
        '11am-2pm': '11am - 2pm',
        '2pm-6pm': '2pm - 6pm'
      }

      const templateParams = {
        name: formData.name,
        company_name: formData.companyName,
        email: formData.email,
        telephone: formData.telephone,
        preferred_time: timeDisplayMap[formData.preferredTime] || formData.preferredTime,
        timestamp: new Date().toLocaleString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          timeZone: 'Europe/London'
        }),
        source: 'MarGav Energy Website - Commercial CTA',
        // CC sales@margav.energy - configure this in EmailJS template settings
        // The template should have "CC Email" field set to: sales@margav.energy
        // Or use the reply_to or cc_email parameter if your email service supports it
        cc_email: 'sales@margav.energy'
      }

      // Send email using Lucy's EmailJS account
      // The email will go to lucy@margav.energy (configured in template)
      // and CC to sales@margav.energy (configured in template or via parameter)
      try {
        // Initialize with lucy account key and send
        emailjs.init(EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY)
        const response = await emailjs.send(
          EMAILJS_COMMERCIAL_LUCY_SERVICE_ID,
          EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID,
          templateParams
        )
        
        if (response && response.status === 200) {
          console.log('Email sent successfully to lucy@margav.energy (CC: sales@margav.energy):', response)
          setSubmitStatus('success')
        } else {
          throw new Error('Email send returned unexpected status')
        }
      } catch (error) {
        console.error('Failed to send email:', error)
        const errorMessage = error.text || error.message || 'Unknown error'
        throw new Error(`Failed to send email: ${errorMessage}`)
      }
      
      // Reset form and close modal
      setFormData({
        name: '',
        companyName: '',
        email: '',
        telephone: '',
        preferredTime: ''
      })
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        closeModal()
        setSubmitStatus(null)
      }, 2000)
    } catch (error) {
      console.error('EmailJS error:', error)
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_COMMERCIAL_TEMPLATE_ID
      })
      
      // Handle specific EmailJS errors
      let message = 'There was an error sending your enquiry. Please try again or contact us directly.'
      
      if (error.status === 412) {
        if (error.text?.includes('Gmail_API: Invalid grant')) {
          message = 'Email service connection expired. Please contact the website administrator to reconnect the email service.'
        } else {
          message = 'Email service connection issue. Please try again later or contact support.'
        }
      } else if (error.status === 400) {
        message = 'Invalid email configuration. Please check your email settings.'
      } else if (error.status === 429) {
        message = 'Too many requests. Please try again in a few moments.'
      }
      
      setErrorMessage(message)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isModalOpen, closeModal])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <>
      <section className="commercial-cta section">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <div className="commercial-cta-content">
              <p className="commercial-cta-text">
                Did you know you can access up to 50% funding on solar panels for commercial properties?
              </p>
              <button className="btn btn-enquire" onClick={openModal}>
                Enquire here!
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              ×
            </button>
            <h2 className="modal-title">Commercial Enquiry</h2>
            <p className="modal-subtitle">Fill in your details and we'll get back to you</p>
            <form className="commercial-form" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-group">
                <label className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Company Name */}
              <div className="form-group">
                <label className="form-label">
                  Company Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  className={`form-input ${errors.companyName ? 'error' : ''}`}
                  required
                />
                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Telephone */}
              <div className="form-group">
                <label className="form-label">
                  Telephone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Enter your telephone number"
                  className={`form-input ${errors.telephone ? 'error' : ''}`}
                  required
                />
                {errors.telephone && <span className="error-message">{errors.telephone}</span>}
              </div>

              {/* Preferred Time of Contact */}
              <div className="form-group">
                <label className="form-label">
                  Preferred Time of Contact <span className="required">*</span>
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={`form-input ${errors.preferredTime ? 'error' : ''}`}
                  required
                >
                  <option value="">Select preferred time</option>
                  <option value="8am-11am">8am - 11am</option>
                  <option value="11am-2pm">11am - 2pm</option>
                  <option value="2pm-6pm">2pm - 6pm</option>
                </select>
                {errors.preferredTime && <span className="error-message">{errors.preferredTime}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit Enquiry →'}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="form-message success">
                  ✓ Thank you for your enquiry! We will contact you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="form-message error">
                  ✗ {errorMessage || 'There was an error sending your enquiry. Please try again or contact us directly.'}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default CommercialCTA

