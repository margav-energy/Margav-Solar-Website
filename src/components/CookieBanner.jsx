import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { pushToDataLayer } from '../config/gtm'
import './CookieBanner.css'

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    
    if (!cookieConsent) {
      // Show banner after a short delay
      setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(cookieConsent)
        setPreferences(savedPrefs)
        applyCookiePreferences(savedPrefs)
      } catch (e) {
        console.error('Error loading cookie preferences:', e)
      }
    }
  }, [])

  const applyCookiePreferences = (prefs) => {
    // This function can be used to enable/disable tracking scripts
    // based on user preferences
    if (prefs.analytics) {
      // Enable analytics cookies (Google Analytics, etc.)
      // This is handled by GTM, but you can add custom logic here
    }
    
    if (prefs.marketing) {
      // Enable marketing cookies (Facebook Pixel, etc.)
      // This is handled by GTM, but you can add custom logic here
    }

    // Track consent in GTM
    pushToDataLayer({
      event: 'cookie_consent',
      cookie_consent_essential: prefs.essential,
      cookie_consent_analytics: prefs.analytics,
      cookie_consent_marketing: prefs.marketing
    })
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
    applyCookiePreferences(allAccepted)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false
    }
    setPreferences(onlyEssential)
    localStorage.setItem('cookieConsent', JSON.stringify(onlyEssential))
    applyCookiePreferences(onlyEssential)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    applyCookiePreferences(preferences)
    setIsVisible(false)
    setShowSettings(false)
  }

  const handlePreferenceChange = (type) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  if (!isVisible) return null

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-container">
        {!showSettings ? (
          <>
            <div className="cookie-banner-content">
              <div className="cookie-banner-text">
                <h3 className="cookie-banner-title">🍪 We Use Cookies</h3>
                <p className="cookie-banner-description">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies. You can also choose to customize your preferences or reject non-essential cookies.
                </p>
                <p className="cookie-banner-links">
                  <Link to="/cookies" className="cookie-banner-link">Learn more in our Cookie Policy</Link>
                  {' • '}
                  <Link to="/privacy" className="cookie-banner-link">Privacy Policy</Link>
                </p>
              </div>
              <div className="cookie-banner-actions">
                <button 
                  className="cookie-btn cookie-btn-secondary"
                  onClick={() => setShowSettings(true)}
                >
                  Customize
                </button>
                <button 
                  className="cookie-btn cookie-btn-secondary"
                  onClick={handleRejectAll}
                >
                  Reject All
                </button>
                <button 
                  className="cookie-btn cookie-btn-primary"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="cookie-settings">
            <div className="cookie-settings-header">
              <h3 className="cookie-settings-title">Cookie Preferences</h3>
              <p className="cookie-settings-description">
                Choose which cookies you want to accept. Essential cookies are required for the website to function.
              </p>
            </div>

            <div className="cookie-settings-options">
              <div className="cookie-option">
                <div className="cookie-option-info">
                  <h4 className="cookie-option-title">Essential Cookies</h4>
                  <p className="cookie-option-description">
                    Required for the website to function. These cannot be disabled.
                  </p>
                </div>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    readOnly
                  />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>

              <div className="cookie-option">
                <div className="cookie-option-info">
                  <h4 className="cookie-option-title">Analytics Cookies</h4>
                  <p className="cookie-option-description">
                    Help us understand how visitors interact with our website (e.g., Google Analytics).
                  </p>
                </div>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handlePreferenceChange('analytics')}
                  />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>

              <div className="cookie-option">
                <div className="cookie-option-info">
                  <h4 className="cookie-option-title">Marketing Cookies</h4>
                  <p className="cookie-option-description">
                    Used to deliver relevant advertisements and track campaign performance (e.g., Facebook Pixel).
                  </p>
                </div>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handlePreferenceChange('marketing')}
                  />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-settings-actions">
              <Link to="/cookies" className="cookie-settings-link">
                Learn more about cookies
              </Link>
              <div className="cookie-settings-buttons">
                <button 
                  className="cookie-btn cookie-btn-secondary"
                  onClick={() => setShowSettings(false)}
                >
                  Back
                </button>
                <button 
                  className="cookie-btn cookie-btn-primary"
                  onClick={handleSavePreferences}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CookieBanner
