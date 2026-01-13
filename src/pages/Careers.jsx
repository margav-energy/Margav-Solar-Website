import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import ScrollAnimation from '../components/ScrollAnimation'
import { 
  EMAILJS_CAREERS_TEMPLATE_ID,
  EMAILJS_CAREERS_LUCY_SERVICE_ID,
  EMAILJS_CAREERS_LUCY_PUBLIC_KEY
} from '../config/emailjs'
import './Careers.css'

const Careers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    interestConfirmed: false
  })
  const [isGeneralInterest, setIsGeneralInterest] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Initialize EmailJS with Lucy's service (where the careers template is located)
  useEffect(() => {
    if (EMAILJS_CAREERS_LUCY_PUBLIC_KEY && EMAILJS_CAREERS_LUCY_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_CAREERS_LUCY_PUBLIC_KEY)
    }
  }, [])

  // Job listings data
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

  const categories = [
    { id: 'all', label: 'All Positions' },
    { id: 'installation', label: 'Installation' },
    { id: 'sales', label: 'Sales' },
    { id: 'management', label: 'Management' },
    { id: 'support', label: 'Support' }
  ]

  const filteredJobs = selectedCategory === 'all' 
    ? jobListings 
    : jobListings.filter(job => job.category === selectedCategory)

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
      newErrors.phone = 'Phone number is required'
    }
    if (!formData.interestConfirmed) {
      newErrors.interestConfirmed = 'Please confirm your interest'
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
        job_title: selectedJob?.title || (isGeneralInterest ? 'General Interest Registration' : 'General Application'),
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
        source: isGeneralInterest ? 'MarGav Energy Website - Interest Registration' : (selectedJob ? 'MarGav Energy Website - Careers Application' : 'MarGav Energy Website - General Application')
      }

      // Send email to lucy@margav.energy with CC to applicant
      // Note: Configure EmailJS template to:
      // - To Email: lucy@margav.energy
      // - CC Email: {{applicant_email}}
      
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
        setSelectedJob(null)
        setIsGeneralInterest(false)
        setSubmitStatus(null)
      }, 3000)
    } catch (error) {
      console.error('EmailJS error:', error)
      
      // Provide more specific error messages
      let errorMsg = 'There was an error submitting your application. Please try again or contact us directly at lucy@margav.energy'
      
      if (error.text) {
        if (error.text.includes('template ID not found')) {
          errorMsg = `Template ID not found. Please verify the template ID "${EMAILJS_CAREERS_TEMPLATE_ID}" exists in your EmailJS account. Visit https://dashboard.emailjs.com/admin/templates to check.`
        } else if (error.text.includes('service ID')) {
          errorMsg = `Service ID not found. Please verify the service ID "${EMAILJS_SERVICE_ID}" is correct.`
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

  return (
    <section className="careers-page">
      <div className="careers-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="careers-page-title text-black">Join Our Team</h1>
            <p className="careers-page-intro text-black">
              Help us power a greener future. We're looking for passionate individuals to join Margav Renewables and make a difference in the renewable energy sector.
            </p>
          </ScrollAnimation>
        </div>
      </div>

      <div className="container">
        {/* Why Work With Us Section */}
        <div className="careers-why-section">
          <ScrollAnimation animation="fadeInUp" delay={200}>
            <h2 className="careers-section-title">Why Work With Us?</h2>
            <div className="careers-benefits-grid">
              <div className="careers-benefit-card">
                <div className="careers-benefit-icon">🌱</div>
                <h3 className="careers-benefit-title">Make a Difference</h3>
                <p className="careers-benefit-text">
                  Be part of the renewable energy revolution and help UK homes and businesses transition to sustainable power.
                </p>
              </div>
              <div className="careers-benefit-card">
                <div className="careers-benefit-icon">📈</div>
                <h3 className="careers-benefit-title">Career Growth</h3>
                <p className="careers-benefit-text">
                  We invest in our team with training opportunities, professional development, and clear career progression paths.
                </p>
              </div>
              <div className="careers-benefit-card">
                <div className="careers-benefit-icon">🤝</div>
                <h3 className="careers-benefit-title">Great Team</h3>
                <p className="careers-benefit-text">
                  Work with a supportive, collaborative team that values innovation, safety, and excellence in everything we do.
                </p>
              </div>
              <div className="careers-benefit-card">
                <div className="careers-benefit-icon">💰</div>
                <h3 className="careers-benefit-title">Competitive Package</h3>
                <p className="careers-benefit-text">
                  We offer competitive salaries, benefits, and flexible working arrangements to support work-life balance.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Job Listings Section */}
        <div className="careers-listings-section">
          <ScrollAnimation animation="fadeInUp" delay={400}>
            <div className="careers-listings-header">
              <h2 className="careers-section-title">Current Openings</h2>
              <div className="careers-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`careers-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="careers-jobs-grid">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <ScrollAnimation key={job.id} animation="fadeInUp" delay={index * 100}>
                    <div className="careers-job-card">
                      <div className="careers-job-header">
                        <div className="careers-job-title-row">
                          <h3 className="careers-job-title">{job.title}</h3>
                          <span className="careers-job-type">{job.type}</span>
                        </div>
                        <div className="careers-job-meta">
                          <span className="careers-job-location">📍 {job.location}</span>
                          <span className="careers-job-date">Posted: {formatDate(job.postedDate)}</span>
                        </div>
                      </div>
                      <p className="careers-job-description">
                        {job.description.length > 200 
                          ? `${job.description.substring(0, 200)}...` 
                          : job.description}
                      </p>
                      <Link 
                        to={`/careers/job/${job.id}`}
                        className="careers-view-details-btn"
                      >
                        View Full Details →
                      </Link>
                    </div>
                  </ScrollAnimation>
                ))
              ) : (
                <div className="careers-no-jobs">
                  <p>No positions available in this category at the moment. Please check again later for new opportunities.</p>
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>

        {/* General Application Section */}
        <div className="careers-general-section">
          <ScrollAnimation animation="fadeInUp" delay={600}>
            <div className="careers-general-card">
              <h2 className="careers-section-title">Don't See a Role That Fits?</h2>
              <p className="careers-general-text">
                We're always looking for talented individuals to join our team. If you're passionate about renewable energy and don't see a specific role that matches your skills, we'd still love to hear from you. Register your interest below and we'll keep you in mind for future opportunities.
              </p>
              <button 
                onClick={() => {
                  setSelectedJob(null)
                  setIsGeneralInterest(true)
                  setShowApplicationForm(true)
                }}
                className="careers-apply-btn careers-apply-btn-secondary"
              >
                Register Your Interest →
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
            setSelectedJob(null)
            setSubmitStatus(null)
            setFormData({
              name: '',
              email: '',
              phone: '',
              notes: '',
              interestConfirmed: false
            })
            setIsGeneralInterest(false)
          }
        }}>
          <div className="careers-form-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="careers-form-close"
              onClick={() => {
                if (!isSubmitting) {
                  setShowApplicationForm(false)
                  setSelectedJob(null)
                  setSubmitStatus(null)
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    interestConfirmed: false
                  })
                  setIsGeneralInterest(false)
                }
              }}
              disabled={isSubmitting}
            >
              ×
            </button>
            <h2 className="careers-form-title">
              {selectedJob ? `Apply for ${selectedJob.title}` : 'Register Your Interest'}
            </h2>
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
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Enter your phone number"
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
                    I confirm my interest in joining MarGav Energy <span className="required">*</span>
                  </span>
                </label>
                {errors.interestConfirmed && <span className="careers-error-message">{errors.interestConfirmed}</span>}
              </div>

              <button 
                type="submit" 
                className="careers-form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : selectedJob ? 'Submit Application →' : 'Register Interest →'}
              </button>

              {submitStatus === 'success' && (
                <div className="careers-form-message success">
                  ✓ {selectedJob ? 'Application submitted successfully! A copy has been sent to your email. We\'ll be in touch soon.' : 'Interest registered successfully! We\'ll be in touch when we have suitable opportunities.'}
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

export default Careers

