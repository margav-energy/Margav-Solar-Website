import React, { useState } from 'react'
import ScrollAnimation from './ScrollAnimation'
import './FAQ.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'How long does installation usually take?',
      answer: 'Most projects are completed within 1–3 days depending on system size and property type.'
    },
    {
      question: 'Do you work with historic or listed buildings?',
      answer: 'Yes. We tailor mounting and routing to preserve character and comply with local planning guidance.'
    },
    {
      question: 'Do you provide warranties and aftercare?',
      answer: 'Yes. Equipment warranties up to 25 years, plus our workmanship guarantee and ongoing support.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq section" id="faq" style={{ scrollMarginTop: '80px' }}>
      <div className="container">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="faq-header">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">Quick answers about our services and process</p>
          </div>
        </ScrollAnimation>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
              <div className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="faq-question-text">Q: {faq.question}</span>
                  <span className="faq-icon">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <p>A: {faq.answer}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

