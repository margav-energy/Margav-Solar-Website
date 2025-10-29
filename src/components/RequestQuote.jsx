import React, { useState } from 'react'
import ScrollAnimation from './ScrollAnimation'
import './RequestQuote.css'

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    email: '',
    houseType: '',
    propertyAge: '',
    monthlyUsage: ''
  })

  const [errors, setErrors] = useState({})

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

  const handleServiceTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      serviceType: type
    }))
    if (errors.serviceType) {
      setErrors(prev => ({
        ...prev,
        serviceType: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData)
      alert('Quote request submitted successfully! We will contact you soon.')
      // Reset form
      setFormData({
        serviceType: '',
        name: '',
        email: '',
        houseType: '',
        propertyAge: '',
        monthlyUsage: ''
      })
    }
  }

  const serviceTypes = [
    { id: 'solar', label: 'Solar Panels', icon: '☀️' },
    { id: 'battery', label: 'Battery Storage', icon: '🔋' },
    { id: 'ev', label: 'EV Chargers', icon: '⚡' }
  ]

  return (
    <section className="request-quote section" id="request-quote">
      <div className="container">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="quote-header">
            <h2 className="quote-title">Request Quote</h2>
            <p className="quote-subtitle">Get an instant estimate for your energy solution</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <form className="quote-form" onSubmit={handleSubmit}>
            {/* Service Type */}
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <div className="service-type-grid">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={`service-type-option ${formData.serviceType === service.id ? 'selected' : ''}`}
                    onClick={() => handleServiceTypeSelect(service.id)}
                  >
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-label">{service.label}</span>
                  </button>
                ))}
              </div>
              {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
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

            {/* House Type */}
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

            {/* Age of Property */}
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

            {/* Monthly Energy Usage */}
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

            {/* Submit Button */}
            <button type="submit" className="btn btn-submit">
              Request Quote →
            </button>
          </form>
        </ScrollAnimation>
      </div>
    </section>
  )
}

export default RequestQuote

