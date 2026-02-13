import React from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import './LegalPage.css'

const PrivacyPolicy = () => {
  const lastUpdated = '2024-01-15'
  const companyName = 'Margav Renewables Ltd'
  const tradingName = 'MarGav Solar'
  const companyNumber = '12580649'
  const address = '7-8, Kimberley Business Park, Kimberley Way, Rugeley WS15 1RE'
  const email = 'sales@margav.energy'
  const phone = '01889 256069'

  return (
    <section className="legal-page">
      <div className="legal-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="legal-page-title">Privacy Policy</h1>
            <p className="legal-page-intro">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="legal-last-updated">Last updated: {lastUpdated}</p>
          </ScrollAnimation>
        </div>
      </div>

      <div className="container">
        <div className="legal-content">
          <ScrollAnimation animation="fadeInUp" delay={200}>
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                {tradingName} (a trading style of {companyName}, Company Number: {companyNumber}) ("we", "us", or "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By using our website or services, you consent to the data practices described in this policy.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Information We Collect</h2>
              
              <h3>2.1 Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul>
                <li><strong>Contact Information:</strong> Name, email address, phone number, postal address</li>
                <li><strong>Property Information:</strong> Property address, property type, energy usage data</li>
                <li><strong>Financial Information:</strong> Payment details (processed securely through third-party payment processors)</li>
                <li><strong>Communication Records:</strong> Correspondence with us via email, phone, or contact forms</li>
              </ul>

              <h3>2.2 Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect:</p>
              <ul>
                <li>IP address and browser type</li>
                <li>Device information (operating system, device type)</li>
                <li>Website usage data (pages visited, time spent, click patterns)</li>
                <li>Cookies and similar tracking technologies (see our <a href="/cookies">Cookie Policy</a>)</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use your personal information for the following purposes:</p>
              <ul>
                <li><strong>Service Delivery:</strong> To provide solar energy consultation, installation, and maintenance services</li>
                <li><strong>Communication:</strong> To respond to your inquiries, provide customer support, and send service updates</li>
                <li><strong>Marketing:</strong> To send you information about our products and services (with your consent, where required)</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our legal rights</li>
                <li><strong>Website Improvement:</strong> To analyze website usage and improve user experience</li>
                <li><strong>Lead Generation:</strong> To process and follow up on leads generated through our website</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Legal Basis for Processing (UK GDPR)</h2>
              <p>Under UK GDPR, we process your personal data based on:</p>
              <ul>
                <li><strong>Consent:</strong> When you have given clear consent for us to process your data for specific purposes</li>
                <li><strong>Contract:</strong> When processing is necessary for the performance of a contract with you</li>
                <li><strong>Legal Obligation:</strong> When we need to comply with a legal obligation</li>
                <li><strong>Legitimate Interests:</strong> When processing is necessary for our legitimate business interests (e.g., website analytics, fraud prevention)</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>5. Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (e.g., payment processors, email services, analytics providers)</li>
                <li><strong>Business Partners:</strong> Trusted partners who assist in delivering our services</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>

            <section className="legal-section">
              <h2>6. Data Storage and Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
              <p>
                Your data is stored on secure servers and may be transferred to and stored in countries outside the UK/EEA. When we do this, we ensure appropriate safeguards are in place.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Typically:
              </p>
              <ul>
                <li>Customer data: Retained for the duration of our business relationship and up to 7 years after</li>
                <li>Marketing data: Retained until you withdraw consent or opt-out</li>
                <li>Website analytics: Retained for up to 26 months</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>8. Your Rights (UK GDPR)</h2>
              <p>Under UK GDPR, you have the following rights:</p>
              <ul>
                <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data (in certain circumstances)</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of how we process your data</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent)</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the details provided in Section 10.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience and analyze website traffic. For detailed information about our use of cookies, please see our <a href="/cookies">Cookie Policy</a>.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
              <div className="legal-contact-info">
                <p><strong>{tradingName}</strong></p>
                <p>Trading style of {companyName}</p>
                <p>Company Number: {companyNumber}</p>
                <p>Registered in England & Wales</p>
                <p><br /></p>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></p>
              </div>
            </section>

            <section className="legal-section">
              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="legal-section">
              <h2>12. Complaints</h2>
              <p>
                If you are not satisfied with how we handle your personal data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK's data protection authority:
              </p>
              <div className="legal-contact-info">
                <p><strong>Information Commissioner's Office</strong></p>
                <p>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></p>
                <p>Phone: 0303 123 1113</p>
              </div>
            </section>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy
