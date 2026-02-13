import React from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import './LegalPage.css'

const TermsOfService = () => {
  const lastUpdated = '10/02/2026'
  const companyName = 'Margav Renewables Ltd'
  const tradingName = 'MarGav Solar'
  const companyNumber = '12580649'
  const address = 'Unit 7-8, Kimberley Business Park, Kimberley Way, Rugeley WS15 1RE'
  const email = 'sales@margav.energy'
  const phone = '01889 256069'

  return (
    <section className="legal-page">
      <div className="legal-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="legal-page-title">Terms of Service</h1>
            <p className="legal-page-intro">
              Please read these terms carefully before using our website or services.
            </p>
            <p className="legal-last-updated">Last updated: {lastUpdated}</p>
          </ScrollAnimation>
        </div>
      </div>

      <div className="container">
        <div className="legal-content">
          <ScrollAnimation animation="fadeInUp" delay={200}>
            <section className="legal-section">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the {tradingName} website or services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our website or services.
              </p>
              <p>
                {tradingName} is a trading style of {companyName} (Company Number: {companyNumber}), registered in England & Wales.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Services</h2>
              <p>
                {tradingName} provides solar energy consultation, installation, and maintenance services for residential and commercial properties in the United Kingdom. Our services include:
              </p>
              <ul>
                <li>Solar panel system design and installation</li>
                <li>Battery storage solutions</li>
                <li>EV charging point installation</li>
                <li>Energy efficiency consultations</li>
                <li>System maintenance and support</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. Use of Website</h2>
              
              <h3>3.1 Permitted Use</h3>
              <p>You may use our website for lawful purposes only. You agree not to:</p>
              <ul>
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
                <li>Transmit any viruses, malware, or harmful code</li>
                <li>Interfere with or disrupt the website's operation</li>
                <li>Copy, modify, or distribute website content without permission</li>
              </ul>

              <h3>3.2 Intellectual Property</h3>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of {tradingName} or its licensors and is protected by UK and international copyright laws.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Service Agreements</h2>
              <p>
                When you engage our services, a separate service agreement or contract will be provided. That agreement will contain specific terms, pricing, warranties, and cancellation policies applicable to your service. In case of conflict, the service agreement will take precedence over these Terms.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Quotes and Estimates</h2>
              <p>
                All quotes and estimates provided are valid for the period stated and are subject to:
              </p>
              <ul>
                <li>Site survey and assessment</li>
                <li>Property suitability verification</li>
                <li>Planning permission requirements (where applicable)</li>
                <li>Grid connection approval</li>
                <li>Material availability</li>
              </ul>
              <p>
                Final pricing may vary based on site-specific conditions discovered during the survey.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Payment Terms</h2>
              <p>
                Payment terms will be specified in your service agreement. Generally:
              </p>
              <ul>
                <li>A deposit may be required to secure your installation date</li>
                <li>Balance payment is typically due upon completion and sign-off</li>
                <li>We typically accept payment by card</li>
                <li>Finance plans may be available, subject to eligibility and approval by our finance provider. Full terms will be provided where applicable</li>
                <li>Late payment may incur interest charges as permitted by law</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>7. Warranties and Guarantees</h2>
              <p>
                We provide warranties on our installations as specified in your service agreement. Manufacturer warranties apply to equipment. Our workmanship warranty typically covers:
              </p>
              <ul>
                <li>Installation quality and compliance with regulations</li>
                <li>System performance within specified parameters</li>
                <li>Defect rectification for a specified period</li>
              </ul>
              <p>
                Warranties are subject to proper maintenance and use as recommended.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Cancellation and Refunds</h2>
              
              <h3>8.1 Consumer Rights (UK)</h3>
              <p>
                If you are a consumer, you have the right to cancel your order within 14 days of placing it (Distance Selling Regulations). However, if you request that we begin work within the cancellation period, you may lose your right to cancel once work has begun.
              </p>

              <h3>8.2 Cancellation by Us</h3>
              <p>
                We reserve the right to cancel or refuse service if:
              </p>
              <ul>
                <li>The property is unsuitable for installation</li>
                <li>Planning permission is denied</li>
                <li>Grid connection is not approved</li>
                <li>You breach these Terms or the service agreement</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law:
              </p>
              <ul>
                <li>Our total liability for any claim (other than liability for death or personal injury caused by our negligence) shall not exceed the value of the services provided</li>
                <li>We shall not be liable for indirect, consequential, or special damages</li>
                <li>We shall not be liable for delays or failure to perform due to circumstances beyond our reasonable control</li>
              </ul>
              <p>
                Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability which cannot be excluded or limited by law.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Insurance and Accreditations</h2>
              <p>
                We maintain appropriate insurance coverage and hold relevant accreditations for our work. Details are available upon request. We are:
              </p>
              <ul>
                <li>MCS (Microgeneration Certification Scheme) certified</li>
                <li>NICEIC registered (where applicable)</li>
                <li>Fully insured for public liability</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>11. Complaints Procedure</h2>
              <p>
                If you have a complaint about our services, please contact us:
              </p>
              <div className="legal-contact-info">
                <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></p>
                <p><strong>Address:</strong> {address}</p>
              </div>
              <p>
                We aim to respond to complaints within 5 working days and resolve them within 28 days.
              </p>
            </section>

            <section className="legal-section">
              <h2>12. Force Majeure</h2>
              <p>
                We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, pandemics, government actions, or supplier failures.
              </p>
            </section>

            <section className="legal-section">
              <h2>13. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section className="legal-section">
              <h2>14. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our website or services after changes are posted constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="legal-section">
              <h2>15. Contact Information</h2>
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
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

export default TermsOfService
