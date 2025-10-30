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
    },
    {
      question: 'Will Energy Prices Continue Rising?',
      answer:
        'Short-term dips aside, wholesale energy prices are expected to trend upward as global demand grows and fossil fuel reduction targets drive higher electricity consumption. This underpins a continued upward trajectory of electricity prices for the foreseeable future.'
    },
    {
      question: 'Do I Really Need to Generate My Own Energy?',
      answer:
        "With aging infrastructure and ambitious decarbonisation goals, the UK faces tightening electricity supply. Generating your own energy improves resilience and reduces long‑term exposure to rising grid prices."
    },
    {
      question: 'Why Have Energy Prices Risen So Much?',
      answer:
        'The majority of UK electricity relies on natural gas. When wholesale gas costs rise, generation costs and consumer prices follow. Fixed deals have reduced, exposing customers more directly to wholesale market movement.'
    },
    {
      question: 'Why Do I Need to Reduce My Carbon Footprint?',
      answer:
        'Cutting your carbon footprint slows climate change, improves public health, and supports a cleaner economy. Solar reduces reliance on fossil fuels and lowers the emissions from powering your home each day.'
    },
    {
      question: 'Can I Sell My Energy Back to the Grid?',
      answer:
        'Yes, through the Smart Export Guarantee (SEG). You are paid for exported excess energy. Rates vary by supplier and are not fixed, but any export can offset your bill.'
    },
    {
      question: 'Can I Add to the System Later?',
      answer:
        'Yes. You can expand with more panels, a higher‑capacity inverter, additional batteries, or EV chargers as your needs change.'
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

