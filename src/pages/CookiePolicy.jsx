import React from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import './LegalPage.css'

const CookiePolicy = () => {
  const lastUpdated = '10/02/2026'
  const companyName = 'Margav Renewables Ltd'
  const tradingName = 'MarGav Solar'
  const email = 'sales@margav.energy'
  const address = 'Unit 7-8, Kimberley Business Park, Kimberley Way, Rugeley WS15 1RE'
  const websiteUrl = 'https://www.margav.energy'

  return (
    <section className="legal-page">
      <div className="legal-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="legal-page-title">Cookie Policy</h1>
            <p className="legal-page-intro">
              This Cookie Policy explains how {tradingName} ("we", "us", "our") uses cookies and similar technologies on our website <a href={websiteUrl} target="_blank" rel="noopener noreferrer">{websiteUrl}</a>.
            </p>
            <p className="legal-last-updated">Last updated: {lastUpdated}</p>
          </ScrollAnimation>
        </div>
      </div>

      <div className="container">
        <div className="legal-content">
          <ScrollAnimation animation="fadeInUp" delay={200}>
            <section className="legal-section">
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, improve user experience, and provide information to website owners.
              </p>
              <p>
                Cookies may be session cookies (deleted when you close your browser) or persistent cookies (stored on your device for a set period).
              </p>
            </section>

            <section className="legal-section">
              <h2>2. How We Use Cookies</h2>
              <p>
                We use cookies to:
              </p>
              <ul>
                <li>Ensure the website functions correctly</li>
                <li>Improve website performance and usability</li>
                <li>Understand how visitors use our website</li>
                <li>Remember user preferences</li>
                <li>Support marketing and advertising activities (where consent is given)</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. Types of Cookies We Use</h2>
              
              <h3>a) Strictly Necessary Cookies</h3>
              <p>
                These cookies are essential for the website to operate and cannot be switched off. They are usually set in response to actions such as filling in forms or setting privacy preferences.
              </p>
              <p>
                <strong>Legal basis:</strong> Legitimate interest / required for service delivery
              </p>

              <h3>b) Performance &amp; Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting information anonymously (e.g. pages visited, time spent on site).
              </p>
              <p>
                Examples may include: Google Analytics
              </p>
              <p>
                <strong>Legal basis:</strong> Consent
              </p>

              <h3>c) Functional Cookies</h3>
              <p>
                These cookies enable enhanced functionality and personalisation, such as remembering preferences or settings.
              </p>
              <p>
                <strong>Legal basis:</strong> Consent
              </p>

              <h3>d) Marketing Cookies</h3>
              <p>
                These cookies may be set through our website by advertising or social media partners. They may be used to build a profile of your interests and show you relevant adverts.
              </p>
              <p>
                <strong>Legal basis:</strong> Consent
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Managing Cookies</h2>
              <p>
                When you first visit our website, you will be presented with a cookie banner allowing you to accept, reject, or manage non-essential cookies.
              </p>
              <p>
                You can also control cookies through your browser settings. Please note that disabling certain cookies may affect website functionality.
              </p>
              <p>
                <strong>Browser guidance:</strong>
              </p>
              <ul>
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy &amp; Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>5. Third-Party Cookies</h2>
              <p>
                Some cookies on our website are set by third parties (e.g. analytics or embedded content providers). We do not control these cookies directly.
              </p>
              <p>
                Please refer to the relevant third party's privacy or cookie policy for more information.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. Any updates will be posted on this page.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="legal-contact-info">
                <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
                <p><strong>Company:</strong> {tradingName} (trading style of {companyName})</p>
                <p><strong>Address:</strong> {address}</p>
              </div>
              <p>
                For information about how we handle your personal data, please see our <a href="/privacy">Privacy Policy</a>.
              </p>
            </section>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

export default CookiePolicy
