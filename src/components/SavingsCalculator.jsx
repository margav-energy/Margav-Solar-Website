import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from './ScrollAnimation'
import './SavingsCalculator.css'

const SavingsCalculator = () => {
  const [currentSpending, setCurrentSpending] = useState(150)
  const [savings, setSavings] = useState(120)

  // Calculate data for the graph
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  // Generate data points (current spending decreases slightly, solar savings increases over time)
  const spendingData = months.map((_, i) => currentSpending * (1 - i * 0.02))
  const savingsData = months.map((_, i) => savings * (1 + i * 0.03))
  const totalSavings = savingsData.reduce((acc, val) => acc + val, 0)

  const benefits = [
    {
      icon: '💰',
      title: 'Accurate Estimates',
      description: 'Get precise calculations based on your actual energy usage and property details.'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'See your potential savings and payback period in seconds, no waiting required.'
    },
    {
      icon: '📊',
      title: 'Customized Report',
      description: 'Receive a detailed breakdown tailored to your specific home and energy needs.'
    },
    {
      icon: '✅',
      title: 'No Obligation',
      description: 'Free to use with no commitment - explore your options risk-free.'
    }
  ]

  const sellingPoints = [
    {
      stat: '95%+',
      label: 'Customer Satisfaction'
    },
    {
      stat: '10,000+',
      label: 'Homes Powered'
    },
    {
      stat: '£2.5M+',
      label: 'Annual Savings'
    }
  ]


  // Find max value for graph scaling
  const maxValue = Math.max(...spendingData, ...savingsData)
  const graphHeight = 250

  return (
    <section className="savings-calculator section">
      <div className="container">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="savings-header">
            <h2 className="savings-main-title">How Much Money Can You Save With Solar?</h2>
            <p className="savings-subtitle">
              Discover your potential savings with our quick energy assessment tool
            </p>
          </div>
        </ScrollAnimation>

        <div className="savings-content">
          {/* Left Side: Graph */}
          <div className="savings-right">
            <ScrollAnimation animation="fadeInLeft" delay={300}>
              <div className="savings-graph-card">
                <div className="graph-header">
                  <h3 className="graph-title">Annual Energy Costs Comparison</h3>
                  <div className="graph-legend">
                    <div className="legend-item">
                      <span className="legend-dot spending-dot"></span>
                      <span className="legend-label">Current Spending</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot savings-dot"></span>
                      <span className="legend-label">With Solar Savings</span>
                    </div>
                  </div>
                </div>
                
                <div className="graph-container">
                  <svg className="savings-graph" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((percent, i) => {
                      const y = 20 + (percent / 100) * graphHeight
                      return (
                        <g key={i}>
                          <line
                            x1="40"
                            y1={y}
                            x2="560"
                            y2={y}
                            stroke="#e0e0e0"
                            strokeWidth="1"
                            strokeDasharray="2,2"
                          />
                          <text
                            x="35"
                            y={y + 5}
                            fontSize="12"
                            fill="#666"
                            textAnchor="end"
                          >
                            £{Math.round(maxValue * (1 - percent / 100))}
                          </text>
                        </g>
                      )
                    })}
                    
                    {/* Spending line (red/orange) */}
                    <polyline
                      points={spendingData.map((value, i) => 
                        `${60 + (i * 45)},${280 - (value / maxValue) * graphHeight}`
                      ).join(' ')}
                      fill="none"
                      stroke="#ff6b6b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Savings line (green) */}
                    <polyline
                      points={savingsData.map((value, i) => 
                        `${60 + (i * 45)},${280 - (value / maxValue) * graphHeight}`
                      ).join(' ')}
                      fill="none"
                      stroke="rgba(102, 204, 102, 1)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Data points for spending */}
                    {spendingData.map((value, i) => (
                      <circle
                        key={`spending-${i}`}
                        cx={60 + (i * 45)}
                        cy={280 - (value / maxValue) * graphHeight}
                        r="4"
                        fill="#ff6b6b"
                      />
                    ))}
                    
                    {/* Data points for savings */}
                    {savingsData.map((value, i) => (
                      <circle
                        key={`savings-${i}`}
                        cx={60 + (i * 45)}
                        cy={280 - (value / maxValue) * graphHeight}
                        r="4"
                        fill="rgba(102, 204, 102, 1)"
                      />
                    ))}
                    
                    {/* Month labels */}
                    {months.map((month, i) => (
                      <text
                        key={i}
                        x={60 + (i * 45)}
                        y="295"
                        fontSize="11"
                        fill="#666"
                        textAnchor="middle"
                      >
                        {month}
                      </text>
                    ))}
                  </svg>
                </div>

                <div className="graph-summary">
                  <div className="summary-item">
                    <span className="summary-label">Current Annual Cost:</span>
                    <span className="summary-value spending-value">£{Math.round(currentSpending * 12)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">With Solar:</span>
                    <span className="summary-value savings-value">£{Math.round((currentSpending - savings) * 12)}</span>
                  </div>
                  <div className="summary-item highlight">
                    <span className="summary-label">Total Annual Savings:</span>
                    <span className="summary-value highlight-value">£{Math.round(savings * 12)}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Side: Benefits and Info */}
          <div className="savings-left">
            <ScrollAnimation animation="fadeInRight" delay={200}>
              <div className="benefits-section">
                <h3 className="benefits-title">Benefits of doing the quickscan</h3>
                <div className="benefits-grid">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                      <span className="benefit-icon">{benefit.icon}</span>
                      <h4 className="benefit-card-title">{benefit.title}</h4>
                      <p className="benefit-card-description">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* <ScrollAnimation animation="fadeInRight" delay={400}>
              <div className="selling-points-section">
                <h3 className="selling-points-title">Unique selling point of the company</h3>
                <div className="selling-points-grid">
                  {sellingPoints.map((point, index) => (
                    <div key={index} className="selling-point-card">
                      <div className="selling-point-stat">{point.stat}</div>
                      <div className="selling-point-label">{point.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation> */}

            <ScrollAnimation animation="fadeInUp" delay={600}>
              <Link to="/request-quote" className="btn btn-quickscan">
                Do the quickscan →
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SavingsCalculator

