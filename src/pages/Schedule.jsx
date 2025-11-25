import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import emailjs from '@emailjs/browser'
import ScrollAnimation from '../components/ScrollAnimation'
import PromoBanner from '../components/PromoBanner'
import { EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_SCHEDULE_TEMPLATE_ID } from '../config/emailjs'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './Schedule.css'

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Component to handle map clicks
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng)
    },
  })
  return null
}

const Schedule = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    propertyAge: '',
    serviceOfInterest: '',
    message: '',
    privacyConsent: false
  })

  const [mapLocation, setMapLocation] = useState({ lat: 52.7586, lng: -1.9339 }) // Rugeley coordinates
  const [markerPosition, setMarkerPosition] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const mapRef = useRef(null)

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_PUBLIC_KEY)
    }
  }, [])

  // Initialize map with marker
  useEffect(() => {
    if (mapRef.current) {
      setMarkerPosition(mapLocation)
    }
  }, [])

  const handleMapClick = (latlng) => {
    setMarkerPosition(latlng)
    setMapLocation(latlng)
    
    // Reverse geocoding to get address
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`, {
      headers: {
        'User-Agent': 'MarGav Solar Contact Form'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.display_name) {
          setFormData(prev => ({
            ...prev,
            propertyAddress: data.display_name
          }))
        }
      })
      .catch(err => console.error('Geocoding error:', err))
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
        {
          headers: {
            'User-Agent': 'MarGav Solar Contact Form'
          }
        }
      )
      const data = await response.json()
      
      if (data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        }
        setMapLocation(location)
        setMarkerPosition(location)
        
        if (mapRef.current) {
          mapRef.current.setView(location, 15)
        }

        setFormData(prev => ({
          ...prev,
          propertyAddress: data[0].display_name
        }))
      }
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.propertyAddress.trim()) {
      newErrors.propertyAddress = 'Property address is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must agree to the Privacy Policy'
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
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.error('EmailJS configuration missing. Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file.')
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      const templateParams = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        property_address: formData.propertyAddress || 'Not provided',
        property_type: formData.propertyType || 'Not specified',
        message: formData.message,
        timestamp: new Date().toLocaleString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          timeZone: 'Europe/London'
        }),
        source: 'MarGav Energy Website - Contact Form'
      }

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_SCHEDULE_TEMPLATE_ID,
        templateParams
      )

      console.log('EmailJS Success:', response)
      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        propertyAddress: '',
        propertyType: '',
        propertyAge: '',
        serviceOfInterest: '',
        message: '',
        privacyConsent: false
      })
      setMarkerPosition(null)
      setSearchQuery('')
    } catch (error) {
      console.error('EmailJS error:', error)
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_SCHEDULE_TEMPLATE_ID
      })
      
      // Handle specific EmailJS errors
      let message = 'There was an error sending your message. Please try again or contact us directly.'
      
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

  return (
    <section className="schedule-page">
      <PromoBanner variant="no-margin" />
      <div className="schedule-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="schedule-page-title">Get In Touch</h1>
            <p className="schedule-page-intro">
              Ready to transform your property? Contact us for a free consultation
            </p>
          </ScrollAnimation>
        </div>
      </div>

      <div className="container">
        <div className="schedule-content">
          {/* Contact Information Section */}
          <div className="contact-info-section">
            <ScrollAnimation animation="fadeInUp" delay={200}>
              <h2 className="contact-info-title">Contact Information</h2>
              <p className="contact-info-description">
                We're here to help you make the switch to renewable energy. Get in touch with our expert team for personalized advice and support.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">📍</div>
                  <div className="contact-detail-content">
                    <h4 className="contact-detail-label">Address</h4>
                    <p className="contact-detail-text">
                      7-8, Kimberley Business Park<br />
                      Kimberley Way, Rugeley WS15 1RE<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">📞</div>
                  <div className="contact-detail-content">
                    <h4 className="contact-detail-label">Phone</h4>
                    <p className="contact-detail-text">
                      <a href="tel:01889256069" className="contact-link">01889 256069</a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">🕒</div>
                  <div className="contact-detail-content">
                    <h4 className="contact-detail-label">Business Hours</h4>
                    <p className="contact-detail-text">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">📱</div>
                  <div className="contact-detail-content">
                    <h4 className="contact-detail-label">Follow Us</h4>
                    <div className="social-links">
                      <a 
                        href="https://www.facebook.com/people/Margav-Solar/61581971564867/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Facebook"
                        title="Facebook"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691V11.06h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.764v2.315h3.587l-.467 3.646h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://www.instagram.com/margav.solar/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Instagram"
                        title="Instagram"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.92 4.92 0 0 1 1.78 1.153 4.92 4.92 0 0 1 1.153 1.78c.163.457.347 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.92 4.92 0 0 1-1.153 1.78 4.92 4.92 0 0 1-1.78 1.153c-.457.163-1.257.347-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.92 4.92 0 0 1-1.78-1.153 4.92 4.92 0 0 1-1.153-1.78c-.163-.457-.347-1.257-.403-2.427C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427a4.92 4.92 0 0 1 1.153-1.78 4.92 4.92 0 0 1 1.78-1.153c.457-.163 1.257-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.897.309 4.158.571a7.08 7.08 0 0 0-2.57 1.67A7.08 7.08 0 0 0-.082 4.91c-.262.739-.44 1.617-.499 2.894C-.013 8.985 0 9.395 0 12c0 2.605-.013 3.015.072 4.196.059 1.277.237 2.155.499 2.894a7.08 7.08 0 0 0 1.67 2.57 7.08 7.08 0 0 0 2.57 1.67c.739.262 1.617.44 2.894.499C8.985 24.013 9.395 24 12 24s3.015.013 4.196-.072c1.277-.059 2.155-.237 2.894-.499a7.08 7.08 0 0 0 2.57-1.67 7.08 7.08 0 0 0 1.67-2.57c.262-.739.44-1.617.499-2.894.085-1.181.072-1.591.072-4.196s.013-3.015-.072-4.196c-.059-1.277-.237-2.155-.499-2.894a7.08 7.08 0 0 0-1.67-2.57 7.08 7.08 0 0 0-2.57-1.67c-.739-.262-1.617-.44-2.894-.499C15.015.013 14.605 0 12 0z"/>
                          <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                          <circle cx="18.406" cy="5.594" r="1.44"/>
                        </svg>
                      </a>
                      <a 
                        href="https://www.linkedin.com/company/margav-energy/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11.846 20H3.692V9h3.462v11zM5.5 7.654c-1.108 0-2.004-.898-2.004-2.006 0-1.108.896-2.004 2.004-2.004 1.108 0 2.006.896 2.006 2.004 0 1.108-.898 2.006-2.006 2.006zM20.308 20h-3.462v-5.746c0-1.369-.027-3.129-1.907-3.129-1.909 0-2.201 1.492-2.201 3.031V20h-3.462V9h3.324v1.507h.047c.463-.877 1.595-1.803 3.283-1.803 3.511 0 4.159 2.312 4.159 5.316V20z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Contact Form Section */}
          <div className="schedule-form-section">
            <ScrollAnimation animation="fadeInUp" delay={400}>
              <h2 className="schedule-form-title">Send us a Message</h2>

              <form className="schedule-form" onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={`form-input ${errors.firstName ? 'error' : ''}`}
                      required
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={`form-input ${errors.lastName ? 'error' : ''}`}
                      required
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
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

                {/* Property Location Search */}
                <div className="form-group">
                  <label className="form-label">
                    Search for your property location
                  </label>
                  <div className="location-search">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
                      placeholder="Type an address or postcode to search..."
                      className="form-input location-search-input"
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="location-search-button"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Map */}
                <div className="form-group">
                  <div className="map-container">
                    <MapContainer
                      center={mapLocation}
                      zoom={13}
                      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
                      whenCreated={(mapInstance) => { mapRef.current = mapInstance }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {markerPosition && (
                        <Marker position={markerPosition} />
                      )}
                      <MapClickHandler onMapClick={handleMapClick} />
                    </MapContainer>
                    <p className="map-instruction">Click on the map to select your property location</p>
                  </div>
                </div>

                {/* Property Address */}
                <div className="form-group">
                  <label className="form-label">
                    Property Address <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    placeholder="Address will be filled automatically from map selection"
                    className={`form-input ${errors.propertyAddress ? 'error' : ''}`}
                    required
                  />
                  {errors.propertyAddress && <span className="error-message">{errors.propertyAddress}</span>}
                </div>

                {/* Property Type */}
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select property type</option>
                    <option value="detached">Detached</option>
                    <option value="semi-detached">Semi-Detached</option>
                    <option value="terraced">Terraced</option>
                    <option value="flat">Flat/Apartment</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* Property Age */}
                <div className="form-group">
                  <label className="form-label">Property Age</label>
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

                {/* Service of Interest */}
                <div className="form-group">
                  <label className="form-label">Service of Interest</label>
                  <select
                    name="serviceOfInterest"
                    value={formData.serviceOfInterest}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select service</option>
                    <option value="solar-panels">Solar Panels</option>
                    <option value="battery-storage">Battery Storage</option>
                    <option value="ev-chargers">EV Chargers</option>
                    <option value="solar-and-battery">Solar Panels + Battery Storage</option>
                    <option value="full-system">Full System (Solar + Battery + EV)</option>
                    <option value="consultation">Consultation Only</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your energy needs and any specific requirements..."
                    className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                    rows="6"
                    required
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                {/* Privacy Consent */}
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      className="checkbox-input"
                      required
                    />
                    <span className="checkbox-text">
                      I agree to the Privacy Policy and consent to my data being processed <span className="required">*</span>
                    </span>
                  </label>
                  {errors.privacyConsent && <span className="error-message">{errors.privacyConsent}</span>}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="form-message success">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="form-message error">
                    ✗ {errorMessage || 'There was an error sending your message. Please try again or contact us directly.'}
                  </div>
                )}
              </form>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule

