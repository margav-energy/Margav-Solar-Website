import React, { useState } from 'react'
import ScrollAnimation from './ScrollAnimation'
import './Features.css'

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      number: '01',
      title: 'Smart Home Systems',
      description: 'Discover how our smart systems optimize energy use and reduce costs automatically.',
      icon: '⚡'
    },
    {
      number: '02',
      title: 'Sustainable Design',
      description: 'Learn about our eco-friendly architectural practices.',
      icon: '🌱'
    },
    {
      number: '03',
      title: 'Client Success Stories',
      description: 'See the impact of our smart homes.',
      icon: '⭐'
    }
  ]

  const solarFeature = {
    title: 'Solar Energy Integration',
    description: 'Generate clean energy at home and reduce exposure to rising electricity costs.',
    savings: {
      target: '£10,000',
      reached: '£4,000',
      percentage: 40
    }
  }

  // Stacked bar chart data for Sustainable Design
  const sustainableData = [
    { month: 'Jan', base: 50, top: 50 },
    { month: 'Feb', base: 48, top: 52 },
    { month: 'Mar', base: 52, top: 48 },
    { month: 'Apr', base: 55, top: 45 },
    { month: 'May', base: 53, top: 47 },
    { month: 'Jun', base: 49, top: 51 }
  ]

  // Line chart data for Client Success Stories
  const clientSuccessData = {
    solar: [45, 50, 55, 62, 68, 75],
    grid: [30, 32, 35, 38, 40, 42]
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  return (
    <section className="features section" id="features">
      <div className="container">
        <div className="features-grid">
          <div className="features-left">
            <ScrollAnimation animation="fadeInRight" delay={0}>
              <h2 className="features-main-title">Innovative Energy Solutions</h2>
              <p className="features-subtitle">Explore our smart home technology offerings.</p>
            </ScrollAnimation>
            
            <div className="features-list">
              {features.map((feature, index) => (
                <ScrollAnimation key={index} animation="fadeInLeft" delay={index * 150}>
                  <div 
                    className={`feature-item ${activeFeature === index ? 'active' : ''}`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="feature-number">{feature.number}</div>
                    <div className="feature-content">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <div className="features-right">
            <ScrollAnimation animation="fadeInLeft" delay={300}>
              {activeFeature === 0 && (
                <div className="solar-feature-card">
                  <span className="card-label">Explore Features</span>
                  <h3 className="card-title">{solarFeature.title}</h3>
                  <p className="card-description">{solarFeature.description}</p>
                  
                  <div className="savings-card">
                    <div className="savings-header">
                      <h4 className="savings-title">Savings</h4>
                      <button className="savings-add">+</button>
                    </div>
                    <div className="savings-content">
                      <div className="savings-chart">
                        <div className="circular-progress">
                          <svg className="progress-ring" width="120" height="120">
                            <circle
                              className="progress-ring-circle"
                              stroke="#e0e0e0"
                              strokeWidth="8"
                              fill="transparent"
                              r="52"
                              cx="60"
                              cy="60"
                            />
                            <circle
                              className="progress-ring-circle progress-ring-circle-active"
                              stroke="var(--color-blue)"
                              strokeWidth="8"
                              fill="transparent"
                              r="52"
                              cx="60"
                              cy="60"
                              strokeDasharray={`${2 * Math.PI * 52}`}
                              strokeDashoffset={`${2 * Math.PI * 52 * (1 - solarFeature.savings.percentage / 100)}`}
                              transform="rotate(-90 60 60)"
                            />
                          </svg>
                          <div className="progress-text">{solarFeature.savings.percentage}%</div>
                        </div>
                      </div>
                      <div className="savings-details">
                        <div className="savings-item">
                          <span className="savings-label">Savings Target</span>
                          <span className="savings-value">{solarFeature.savings.target}</span>
                        </div>
                        <div className="savings-item">
                          <span className="savings-label">Target Reached</span>
                          <span className="savings-value">{solarFeature.savings.reached}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeFeature === 1 && (
                <div className="solar-feature-card">
                  <div className="card-header-with-link">
                    <span className="card-label">Innovative Technology</span>
                    <a href="#" className="see-more-link">See More</a>
                  </div>
                  <h3 className="card-title">High-Performance Insulation</h3>
                  <p className="card-description">Ensure your home remains comfortable year-round.</p>
                  
                  <div className="savings-card">
                    <div className="savings-header">
                      <h4 className="savings-title">Report</h4>
                      <button className="savings-add">+</button>
                    </div>
                    <div className="stacked-chart-container">
                      <svg className="stacked-bar-chart" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
                        {/* Y-axis labels */}
                        {[0, 25, 50, 75, 100].map((value, i) => (
                          <text
                            key={i}
                            x="20"
                            y={220 - (value / 100) * 180}
                            fontSize="12"
                            fill="#666"
                            textAnchor="end"
                          >
                            {value}
                          </text>
                        ))}
                        {/* Grid lines */}
                        {[0, 25, 50, 75, 100].map((value, i) => (
                          <line
                            key={i}
                            x1="30"
                            y1={220 - (value / 100) * 180}
                            x2="380"
                            y2={220 - (value / 100) * 180}
                            stroke="#e0e0e0"
                            strokeWidth="1"
                          />
                        ))}
                        {/* Bars */}
                        {sustainableData.map((data, i) => {
                          const barWidth = 45
                          const barSpacing = 15
                          const xStart = 50 + i * (barWidth + barSpacing)
                          const baseHeight = (data.base / 100) * 180
                          const topHeight = (data.top / 100) * 180
                          
                          return (
                            <g key={i}>
                              {/* Base segment (black) */}
                              <rect
                                x={xStart}
                                y={220 - baseHeight}
                                width={barWidth}
                                height={baseHeight}
                                fill="#000"
                              />
                              {/* Top segment (grey) */}
                              <rect
                                x={xStart}
                                y={220 - baseHeight - topHeight}
                                width={barWidth}
                                height={topHeight}
                                fill="#d0d0d0"
                              />
                              {/* Month label */}
                              <text
                                x={xStart + barWidth / 2}
                                y="240"
                                fontSize="12"
                                fill="#666"
                                textAnchor="middle"
                              >
                                {data.month}
                              </text>
                            </g>
                          )
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {activeFeature === 2 && (
                <div className="solar-feature-card">
                  <span className="card-label">Innovative Technology</span>
                  <h3 className="card-title">Power Usage</h3>
                  <p className="card-description">Track your energy consumption and savings over time.</p>
                  
                  <div className="savings-card">
                    <div className="savings-header">
                      <h4 className="savings-title">Power Usage</h4>
                    </div>
                    <div className="line-chart-container">
                      <svg className="line-chart" viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet">
                        {/* Grid lines */}
                        {[0, 20, 40, 60, 80, 100].map((value, i) => (
                          <line
                            key={i}
                            x1="40"
                            y1={20 + (value / 100) * 180}
                            x2="480"
                            y2={20 + (value / 100) * 180}
                            stroke="#f0f0f0"
                            strokeWidth="1"
                          />
                        ))}
                        {/* Solar line */}
                        <polyline
                          points={clientSuccessData.solar.map((value, i) => 
                            `${60 + i * 70},${200 - (value / 100) * 180}`
                          ).join(' ')}
                          fill="none"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Solar data points */}
                        {clientSuccessData.solar.map((value, i) => (
                          <circle
                            key={`solar-${i}`}
                            cx={60 + i * 70}
                            cy={200 - (value / 100) * 180}
                            r="4"
                            fill="#000"
                          />
                        ))}
                        {/* Grid line */}
                        <polyline
                          points={clientSuccessData.grid.map((value, i) => 
                            `${60 + i * 70},${200 - (value / 100) * 180}`
                          ).join(' ')}
                          fill="none"
                          stroke="#d0d0d0"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Grid data points */}
                        {clientSuccessData.grid.map((value, i) => (
                          <circle
                            key={`grid-${i}`}
                            cx={60 + i * 70}
                            cy={200 - (value / 100) * 180}
                            r="4"
                            fill="#d0d0d0"
                          />
                        ))}
                        {/* Month labels */}
                        {months.map((month, i) => (
                          <text
                            key={i}
                            x={60 + i * 70}
                            y="240"
                            fontSize="12"
                            fill="#666"
                            textAnchor="middle"
                          >
                            {month}
                          </text>
                        ))}
                      </svg>
                      {/* Legend and values */}
                      <div className="chart-legend">
                        <div className="legend-item">
                          <span className="legend-dot solar-dot"></span>
                          <span className="legend-label">Solar</span>
                          <span className="legend-value">£4,087</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dot grid-dot"></span>
                          <span className="legend-label">Grid</span>
                          <span className="legend-value">£5,506</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

