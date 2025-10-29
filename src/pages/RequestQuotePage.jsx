import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import ScrollAnimation from '../components/ScrollAnimation'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/emailjs'
import './RequestQuotePage.css'

const RequestQuotePage = () => {
  const [formData, setFormData] = useState({
    services: [], // Array to allow multiple selections
    name: '',
    email: '',
    phone: '',
    houseType: '',
    propertyAge: '',
    monthlyUsage: '',
    roofType: '',
    roofOrientation: '',
    currentElectricitySupplier: '',
    batteryCapacity: '',
    numberOfEvChargers: '',
    evChargerType: '',
    additionalNotes: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Initialize EmailJS on component mount
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_PUBLIC_KEY)
    }
  }, [])

  const serviceTypes = [
    { id: 'solar', label: 'Solar Panels', icon: '☀️', fields: ['roofType', 'roofOrientation'] },
    { id: 'battery', label: 'Battery Storage', icon: '🔋', fields: ['batteryCapacity', 'currentElectricitySupplier'] },
    { id: 'ev', label: 'EV Chargers', icon: '⚡', fields: ['numberOfEvChargers', 'evChargerType'] }
  ]

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
      
      return {
        ...prev,
        services
      }
    })
    
    if (errors.services) {
      setErrors(prev => ({
        ...prev,
        services: ''
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const getVisibleFields = () => {
    // Base fields - always visible after service selection
    const visibleFields = ['name', 'email']
    
    // If services are selected, show additional base fields
    if (formData.services.length > 0) {
      visibleFields.push('phone', 'houseType', 'propertyAge', 'monthlyUsage')
    }
    
    // Add service-specific fields based on selected services
    formData.services.forEach(serviceId => {
      const service = serviceTypes.find(s => s.id === serviceId)
      if (service) {
        visibleFields.push(...service.fields)
      }
    })
    
    return visibleFields
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service type'
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
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
      // Build service details string
      let serviceDetails = []
      if (formData.services.includes('solar')) {
        serviceDetails.push('SOLAR PANELS:')
        serviceDetails.push(`  Roof Type: ${formData.roofType || 'Not specified'}`)
        serviceDetails.push(`  Roof Orientation: ${formData.roofOrientation || 'Not specified'}`)
      }
      if (formData.services.includes('battery')) {
        serviceDetails.push('BATTERY STORAGE:')
        serviceDetails.push(`  Required Capacity: ${formData.batteryCapacity || 'Not specified'} kWh`)
        serviceDetails.push(`  Current Electricity Supplier: ${formData.currentElectricitySupplier || 'Not specified'}`)
      }
      if (formData.services.includes('ev')) {
        serviceDetails.push('EV CHARGERS:')
        serviceDetails.push(`  Number of Chargers: ${formData.numberOfEvChargers || 'Not specified'}`)
        serviceDetails.push(`  Charger Type: ${formData.evChargerType || 'Not specified'}`)
      }
      if (formData.additionalNotes) {
        serviceDetails.push('ADDITIONAL NOTES:')
        serviceDetails.push(`  ${formData.additionalNotes}`)
      }

      const servicesList = formData.services.map(id => {
        const service = serviceTypes.find(s => s.id === id)
        return service ? service.label : id
      }).join(', ')

      const templateParams = {
        customer_name: formData.name,
        customer_email: formData.email,
        house_type: formData.houseType || 'Not specified',
        property_age: formData.propertyAge || 'Not specified',
        energy_usage: formData.monthlyUsage || 'Not provided',
        services: servicesList || 'None selected',
        service_details: serviceDetails.length > 0 ? serviceDetails.join('\n') : 'No specific service details provided',
        timestamp: new Date().toLocaleString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          timeZone: 'Europe/London'
        }),
        source: 'MarGav Energy Website - Quote Calculator'
      }

      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.error('EmailJS configuration missing. Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file.')
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      console.log('EmailJS Success:', response)
      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        services: [],
        name: '',
        email: '',
        phone: '',
        houseType: '',
        propertyAge: '',
        monthlyUsage: '',
        roofType: '',
        roofOrientation: '',
        currentElectricitySupplier: '',
        batteryCapacity: '',
        numberOfEvChargers: '',
        evChargerType: '',
        additionalNotes: ''
      })
    } catch (error) {
      console.error('EmailJS error:', error)
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID
      })
      
      // Handle specific EmailJS errors
      let message = 'There was an error sending your request. Please try again or contact us directly.'
      
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

  const visibleFields = getVisibleFields()
  const hasSolar = formData.services.includes('solar')
  const hasBattery = formData.services.includes('battery')
  const hasEv = formData.services.includes('ev')

  return (
    <section className="request-quote-page">
      <div className="quote-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="quote-page-title">Request a Quote</h1>
            <p className="quote-page-intro">
              Get an instant estimate for your energy solution. Select one or more services below to get started.
            </p>
          </ScrollAnimation>
        </div>
      </div>

      <div className="container">
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <form className="quote-form" onSubmit={handleSubmit}>
            {/* Service Type - Multiple Selection */}
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <div className="service-type-grid">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={`service-type-option ${formData.services.includes(service.id) ? 'selected' : ''}`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-label">{service.label}</span>
                    {formData.services.includes(service.id) && (
                      <span className="service-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
              {errors.services && <span className="error-message">{errors.services}</span>}
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label">
                Your Name <span className="required">*</span>
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

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
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

            {/* Phone */}
            {visibleFields.includes('phone') && (
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="form-input"
                />
              </div>
            )}

            {/* House Type */}
            {visibleFields.includes('houseType') && (
              <div className="form-group">
                <label className="form-label">House Type</label>
                <select
                  name="houseType"
                  value={formData.houseType}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select house type</option>
                  <option value="detached">Detached</option>
                  <option value="semi-detached">Semi-Detached</option>
                  <option value="terraced">Terraced</option>
                  <option value="flat">Flat/Apartment</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            )}

            {/* Age of Property */}
            {visibleFields.includes('propertyAge') && (
              <div className="form-group">
                <label className="form-label">Age of Property</label>
                <select
                  name="propertyAge"
                  value={formData.propertyAge}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select age range</option>
                  <option value="new">New Build (0-5 years)</option>
                  <option value="modern">Modern (6-20 years)</option>
                  <option value="mid">Mid (21-50 years)</option>
                  <option value="older">Older (50+ years)</option>
                  <option value="listed">Listed/Historic</option>
                </select>
              </div>
            )}

            {/* Monthly Energy Usage */}
            {visibleFields.includes('monthlyUsage') && (
              <div className="form-group">
                <label className="form-label">
                  Monthly Energy Usage (kWh) <span className="optional">- Optional</span>
                </label>
                <input
                  type="number"
                  name="monthlyUsage"
                  value={formData.monthlyUsage}
                  onChange={handleChange}
                  placeholder="Enter monthly usage"
                  className="form-input"
                  min="0"
                  step="10"
                />
              </div>
            )}

            {/* Solar Panel Specific Fields */}
            {hasSolar && (
              <>
                <div className="form-group">
                  <label className="form-label">Roof Type</label>
                  <select
                    name="roofType"
                    value={formData.roofType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select roof type</option>
                    <option value="tiled">Tiled</option>
                    <option value="slate">Slate</option>
                    <option value="metal">Metal</option>
                    <option value="flat">Flat</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Roof Orientation</label>
                  <select
                    name="roofOrientation"
                    value={formData.roofOrientation}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select orientation</option>
                    <option value="south">South</option>
                    <option value="south-east">South-East</option>
                    <option value="south-west">South-West</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="north">North</option>
                  </select>
                </div>
              </>
            )}

            {/* Battery Storage Specific Fields */}
            {hasBattery && (
              <>
                <div className="form-group">
                  <label className="form-label">Required Battery Capacity (kWh)</label>
                  <input
                    type="number"
                    name="batteryCapacity"
                    value={formData.batteryCapacity}
                    onChange={handleChange}
                    placeholder="Enter required capacity"
                    className="form-input"
                    min="0"
                    step="0.5"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Electricity Supplier</label>
                  <input
                    type="text"
                    name="currentElectricitySupplier"
                    value={formData.currentElectricitySupplier}
                    onChange={handleChange}
                    placeholder="Enter current supplier name"
                    className="form-input"
                  />
                </div>
              </>
            )}

            {/* EV Charger Specific Fields */}
            {hasEv && (
              <>
                <div className="form-group">
                  <label className="form-label">Number of EV Chargers</label>
                  <select
                    name="numberOfEvChargers"
                    value={formData.numberOfEvChargers}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select number</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">EV Charger Type</label>
                  <select
                    name="evChargerType"
                    value={formData.evChargerType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select type</option>
                    <option value="standard">Standard (3.7kW)</option>
                    <option value="fast">Fast (7kW)</option>
                    <option value="rapid">Rapid (22kW+)</option>
                    <option value="unsure">Not Sure</option>
                  </select>
                </div>
              </>
            )}

            {/* Additional Notes */}
            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any additional information or questions..."
                className="form-input form-textarea"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Quote →'}
            </button>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="form-message success">
                ✓ Quote request submitted successfully! We will contact you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="form-message error">
                ✗ {errorMessage || 'There was an error submitting your request. Please try again or contact us directly.'}
              </div>
            )}
          </form>
        </ScrollAnimation>
      </div>
    </section>
  )
}

export default RequestQuotePage

