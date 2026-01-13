import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import ScrollAnimation from '../components/ScrollAnimation'
import { 
  EMAILJS_CAREERS_TEMPLATE_ID,
  EMAILJS_CAREERS_LUCY_SERVICE_ID,
  EMAILJS_CAREERS_LUCY_PUBLIC_KEY
} from '../config/emailjs'
import './JobListing.css'
import './Careers.css'

// Job listings data - should match Careers.jsx
const jobListings = [
  {
    id: 2,
    title: 'Call Centre (Renewable Energy)',
    category: 'sales',
    location: 'Rugeley, Staffordshire',
    type: 'Full-time',
    description: 'Join the Clean Energy Movement with Margav Energy! Are you a motivated and enthusiastic sales professional with a passion for sustainability? Do you thrive in a fast-paced call centre environment where your efforts directly impact your earnings and the planet? Margav Energy is a leading provider of Renewable energy, helping homeowners and businesses reduce their carbon footprint while saving on energy costs. We are looking for driven and energetic Sales Representatives to join our call centre team. Your role will focus on promoting and selling renewable energy products, such as solar PV systems and energy efficiency solutions, to residential and commercial customers.',
    requirements: [
      'Experience in a sales, call centre, or customer service role (energy industry a bonus)',
      'Excellent verbal communication and persuasion skills',
      'Self-motivated, target-driven, and a strong team player',
      'Quick learner with a genuine interest in sustainability and clean energy',
      'Comfortable working in a fast-paced, phone-based sales environment'
    ],
    responsibilities: [
      'Make outbound calls to qualified leads interested in renewable energy',
      'Educate customers on the financial and environmental benefits of going green',
      'Understand customer energy needs and recommend tailored solutions',
      'Follow up with leads and manage your sales pipeline via our CRM',
      'Meet and exceed daily/weekly sales targets and KPIs',
      'Guide customers through the sales process',
      'Stay up to date with product knowledge, industry trends, and incentives'
    ],
    benefits: [
      'Competitive base salary + On target commission (uncapped)',
      'Full training and ongoing professional development',
      'Career growth opportunities within a growing green energy company',
      'Supportive and energetic team culture',
      'The chance to make a real impact on the environment',
      'Company pension',
      'On-site parking'
    ],
    postedDate: '2026-01-07'
  }
]

const JobListing = () => {
  const { id } = useParams()
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    interestConfirmed: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const job = jobListings.find(j => j.id === parseInt(id))

  // Initialize EmailJS with Lucy's service (where the careers template is located)
  useEffect(() => {
    if (EMAILJS_CAREERS_LUCY_PUBLIC_KEY && EMAILJS_CAREERS_LUCY_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_CAREERS_LUCY_PUBLIC_KEY)
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateApplicationForm = () => {
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
      newErrors.phone = 'Contact number is required'
    }
    if (!formData.interestConfirmed) {
      newErrors.interestConfirmed = 'Please confirm your interest in this position'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateApplicationForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      if (EMAILJS_CAREERS_LUCY_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_CAREERS_LUCY_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.error('EmailJS configuration missing.')
        setSubmitStatus('error')
        setErrorMessage('Email service is not configured. Please contact us directly at lucy@margav.energy')
        setIsSubmitting(false)
        return
      }

      const templateParams = {
        to_email: 'lucy@margav.energy',
        applicant_email: formData.email,
        applicant_name: formData.name,
        applicant_phone: formData.phone,
        applicant_notes: formData.notes || 'No notes provided',
        job_title: job?.title || 'General Application',
        interest_confirmed: formData.interestConfirmed ? 'Yes' : 'No',
        timestamp: new Date().toLocaleString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          timeZone: 'Europe/London'
        }),
        source: 'MarGav Energy Website - Careers Application'
      }

      // Debug: Log the configuration being used
      console.log('EmailJS Configuration:', {
        serviceId: EMAILJS_CAREERS_LUCY_SERVICE_ID,
        templateId: EMAILJS_CAREERS_TEMPLATE_ID,
        publicKey: EMAILJS_CAREERS_LUCY_PUBLIC_KEY ? `${EMAILJS_CAREERS_LUCY_PUBLIC_KEY.substring(0, 10)}...` : 'Not set'
      })
      
      // Use Lucy's service directly (where the template is located)
      const response = await emailjs.send(
        EMAILJS_CAREERS_LUCY_SERVICE_ID,
        EMAILJS_CAREERS_TEMPLATE_ID,
        templateParams
      )

      console.log('EmailJS Success:', response)
      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        notes: '',
        interestConfirmed: false
      })
      
      // Close form after 3 seconds
      setTimeout(() => {
        setShowApplicationForm(false)
        setSubmitStatus(null)
      }, 3000)
    } catch (error) {
      console.error('EmailJS error:', error)
      
      // Provide more specific error messages
      let errorMsg = 'There was an error submitting your application. Please try again or contact us directly at lucy@margav.energy'
      
      if (error.status === 412 || (error.text && error.text.includes('Invalid grant'))) {
        errorMsg = 'Gmail connection expired. Please reconnect your Gmail account in EmailJS dashboard: https://dashboard.emailjs.com/admin/integration. Click on service "service_rfga4ug" and reconnect Gmail.'
      } else if (error.text) {
        if (error.text.includes('template ID not found')) {
          errorMsg = `Template ID not found. Please verify the template ID "${EMAILJS_CAREERS_TEMPLATE_ID}" exists in your EmailJS account. Visit https://dashboard.emailjs.com/admin/templates to check.`
        } else if (error.text.includes('service ID')) {
          errorMsg = `Service ID not found. Please verify the service ID "${EMAILJS_CAREERS_LUCY_SERVICE_ID}" is correct.`
        } else if (error.text.includes('Gmail_API')) {
          errorMsg = `Gmail API Error: ${error.text}. Please check your Gmail connection in EmailJS dashboard.`
        } else {
          errorMsg = `EmailJS Error: ${error.text}`
        }
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`
      }
      
      setErrorMessage(errorMsg)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!job) {
    return (
      <section className="job-listing-page">
        <div className="container">
          <div className="job-not-found">
            <h1>Job Not Found</h1>
            <p>The job listing you're looking for doesn't exist or has been removed.</p>
            <Link to="/careers" className="careers-back-link">← Back to Careers</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="job-listing-page">
      <div className="job-listing-hero">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <Link to="/careers" className="job-listing-back">← Back to Careers</Link>
            <div className="job-listing-header">
              <div className="job-listing-title-row">
                <h1 className="job-listing-title">{job.title}</h1>
                <span className="job-listing-type">{job.type}</span>
              </div>
              <div className="job-listing-meta">
                <span className="job-listing-location">📍 {job.location}</span>
                <span className="job-listing-date">Posted: {formatDate(job.postedDate)}</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      <div className="container">
        <div className="job-listing-content">
          <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="job-listing-section">
              <h2 className="job-listing-section-title">Job Description</h2>
              <p className="job-listing-description">{job.description}</p>
            </div>

            {job.responsibilities && (
              <div className="job-listing-section">
                <h2 className="job-listing-section-title">What You'll Be Doing</h2>
                <ul className="job-listing-list">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="job-listing-section">
              <h2 className="job-listing-section-title">What You Bring</h2>
              <ul className="job-listing-list">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {job.benefits && (
              <div className="job-listing-section">
                <h2 className="job-listing-section-title">What We Offer</h2>
                <ul className="job-listing-list">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="job-listing-apply-section">
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="job-listing-apply-btn"
              >
                Apply for This Position →
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="careers-form-overlay" onClick={() => {
          if (!isSubmitting) {
            setShowApplicationForm(false)
            setSubmitStatus(null)
            setFormData({
              name: '',
              email: '',
              phone: '',
              notes: '',
              interestConfirmed: false
            })
          }
        }}>
          <div className="careers-form-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="careers-form-close"
              onClick={() => {
                if (!isSubmitting) {
                  setShowApplicationForm(false)
                  setSubmitStatus(null)
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    interestConfirmed: false
                  })
                }
              }}
              disabled={isSubmitting}
            >
              ×
            </button>
            <h2 className="careers-form-title">Apply for {job.title}</h2>
            <form className="careers-application-form" onSubmit={handleApplicationSubmit}>
              <div className="careers-form-group">
                <label className="careers-form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter your full name"
                  className={`careers-form-input ${errors.name ? 'error' : ''}`}
                  required
                />
                {errors.name && <span className="careers-error-message">{errors.name}</span>}
              </div>

              <div className="careers-form-group">
                <label className="careers-form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Enter your email address"
                  className={`careers-form-input ${errors.email ? 'error' : ''}`}
                  required
                />
                {errors.email && <span className="careers-error-message">{errors.email}</span>}
              </div>

              <div className="careers-form-group">
                <label className="careers-form-label">
                  Contact Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Enter your contact number"
                  className={`careers-form-input ${errors.phone ? 'error' : ''}`}
                  required
                />
                {errors.phone && <span className="careers-error-message">{errors.phone}</span>}
              </div>

              <div className="careers-form-group">
                <label className="careers-form-label">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  placeholder="Add any additional notes or information you'd like to share..."
                  className="careers-form-input"
                  rows="4"
                />
              </div>

              <div className="careers-form-group">
                <label className="careers-form-label" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="interestConfirmed"
                    checked={formData.interestConfirmed}
                    onChange={handleFormChange}
                    style={{ marginTop: '4px', width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <span>
                    I confirm my interest in this position <span className="required">*</span>
                  </span>
                </label>
                {errors.interestConfirmed && <span className="careers-error-message">{errors.interestConfirmed}</span>}
              </div>

              <button 
                type="submit" 
                className="careers-form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application →'}
              </button>

              {submitStatus === 'success' && (
                <div className="careers-form-message success">
                  ✓ Application submitted successfully! A copy has been sent to your email. We'll be in touch soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="careers-form-message error">
                  ✗ {errorMessage || 'There was an error submitting your application. Please try again or contact us directly at lucy@margav.energy'}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default JobListing

