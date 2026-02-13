import React from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import './LegalPage.css'

const CookiePolicy = () => {
  const lastUpdated = '2024-01-15'
  const companyName = 'Margav Renewables Ltd'
  const tradingName = 'MarGav Solar'
  const email = 'sales@margav.energy'

  return (
    <section className="legal-page">
      <div className="legal-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="legal-page-title">Cookie Policy</h1>
            <p className="legal-page-intro">
              This Cookie Policy explains how we use cookies and similar technologies on our website.
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
                Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p>
                Cookies can be "persistent" (remain on your device until deleted or expired) or "session" (deleted when you close your browser).
              </p>
            </section>

            <section className="legal-section">
              <h2>2. How We Use Cookies</h2>
              <p>
                We use cookies and similar technologies for the following purposes:
              </p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites for marketing purposes</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. Types of Cookies We Use</h2>
              
              <h3>3.1 Essential Cookies</h3>
              <p>These cookies are necessary for the website to function and cannot be switched off:</p>
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Session ID</td>
                    <td>Maintains your session while browsing</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>Consent Preferences</td>
                    <td>Stores your cookie consent preferences</td>
                    <td>1 year</td>
                  </tr>
                </tbody>
              </table>

              <h3>3.2 Analytics Cookies</h3>
              <p>These cookies help us understand website usage:</p>
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>_ga</td>
                    <td>Google Analytics - distinguishes users</td>
                    <td>2 years</td>
                  </tr>
                  <tr>
                    <td>_gid</td>
                    <td>Google Analytics - distinguishes users</td>
                    <td>24 hours</td>
                  </tr>
                  <tr>
                    <td>_gat</td>
                    <td>Google Analytics - throttles request rate</td>
                    <td>1 minute</td>
                  </tr>
                  <tr>
                    <td>gtm.start</td>
                    <td>Google Tag Manager - tracks page views</td>
                    <td>Session</td>
                  </tr>
                </tbody>
              </table>

              <h3>3.3 Marketing Cookies</h3>
              <p>These cookies are used to deliver relevant advertisements:</p>
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>_fbp</td>
                    <td>Facebook Pixel - tracks conversions</td>
                    <td>90 days</td>
                  </tr>
                  <tr>
                    <td>_fbc</td>
                    <td>Facebook Pixel - tracks clicks</td>
                    <td>90 days</td>
                  </tr>
                </tbody>
              </table>

              <h3>3.4 Functional Cookies</h3>
              <p>These cookies remember your preferences:</p>
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>leadPopupSeen</td>
                    <td>Remembers if you've seen the lead capture popup</td>
                    <td>Persistent</td>
                  </tr>
                  <tr>
                    <td>leadPopupSubmitted</td>
                    <td>Remembers if you've submitted the lead form</td>
                    <td>Persistent</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="legal-section">
              <h2>4. Third-Party Cookies</h2>
              <p>
                We use third-party services that may set cookies on your device:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> Website analytics and usage tracking</li>
                <li><strong>Google Tag Manager:</strong> Manages tracking tags and scripts</li>
                <li><strong>Facebook Pixel:</strong> Tracks conversions for advertising (if applicable)</li>
                <li><strong>Social Media Platforms:</strong> Embedded content may set cookies</li>
              </ul>
              <p>
                These third parties have their own privacy policies and cookie practices. We encourage you to review them.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Managing Cookies</h2>
              
              <h3>5.1 Browser Settings</h3>
              <p>
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul>
                <li>Block all cookies</li>
                <li>Block third-party cookies</li>
                <li>Delete existing cookies</li>
                <li>Set notifications when cookies are set</li>
              </ul>
              <p>
                However, blocking essential cookies may affect website functionality.
              </p>

              <h3>5.2 Browser-Specific Instructions</h3>
              <ul>
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>

              <h3>5.3 Opt-Out Tools</h3>
              <p>You can opt out of certain tracking:</p>
              <ul>
                <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                <li><strong>Facebook:</strong> Manage through your Facebook account settings</li>
                <li><strong>Your Online Choices:</strong> <a href="http://www.youronlinechoices.com/uk" target="_blank" rel="noopener noreferrer">youronlinechoices.com</a></li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Local Storage and Similar Technologies</h2>
              <p>
                In addition to cookies, we may use:
              </p>
              <ul>
                <li><strong>Local Storage:</strong> Stores data in your browser (e.g., form preferences)</li>
                <li><strong>Session Storage:</strong> Temporary storage for your session</li>
                <li><strong>Web Beacons:</strong> Small images used to track email opens and page views</li>
              </ul>
              <p>
                You can manage these through your browser settings, similar to cookies.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Do Not Track Signals</h2>
              <p>
                Some browsers send "Do Not Track" (DNT) signals. Currently, there is no standard for how websites respond to DNT signals. We do not currently respond to DNT signals, but we respect your cookie preferences as set in your browser.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by updating the "Last updated" date at the top of this page.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. More Information</h2>
              <p>
                For more information about cookies and how they work, visit:
              </p>
              <ul>
                <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">All About Cookies</a></li>
                <li><a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noopener noreferrer">ICO Guide to Cookies</a></li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>10. Contact Us</h2>
              <p>If you have questions about our use of cookies, please contact us:</p>
              <div className="legal-contact-info">
                <p><strong>{tradingName}</strong></p>
                <p>Trading style of {companyName}</p>
                <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
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
