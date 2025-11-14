import React from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from '../components/ScrollAnimation'
import BrandName from '../components/BrandName'
import FAQ from '../components/FAQ'
import ImageCarousel from '../components/ImageCarousel'
import gallery1 from '../assets/gallery_1.png'
import gallery2 from '../assets/gallery_2.png'
import gallery3 from '../assets/gallery_3.png'
import gallery4 from '../assets/gallery_4.png'
import gallery5 from '../assets/gallery_5.png'
import gallery6 from '../assets/gallery_6.png'
import gallery7 from '../assets/gallery_7.png'
import './About.css'

const About = () => {
  // Images for the hero carousel
  const heroImages = [
    { src: gallery1, alt: 'Solar panel gallery image 1' },
    { src: gallery2, alt: 'Solar panel gallery image 2' },
    { src: gallery3, alt: 'Solar panel gallery image 3' },
    { src: gallery4, alt: 'Solar panel gallery image 4' },
    { src: gallery5, alt: 'Solar panel gallery image 5' },
    { src: gallery6, alt: 'Solar panel gallery image 6' },
    { src: gallery7, alt: 'Solar panel gallery image 7' }
  ]

  // Why Choose Us benefits
  const benefits = [
    {
      icon: '✓',
      title: 'Expert installation',
      description: 'Our team is skilled in designing and implementing energy systems for all types of properties.'
    },
    {
      icon: '⚡',
      title: 'Premium technology',
      description: 'We partner with leading manufacturers to bring you the best solar, battery, and EV charging solutions.'
    },
    {
      icon: '💰',
      title: 'Long-term savings',
      description: 'Our energy solutions are designed to reduce electricity costs and maximize efficiency.'
    },
    {
      icon: '🎧',
      title: 'End-to-end support',
      description: 'From consultation to installation and maintenance, we provide full-service solutions tailored to your needs.'
    },
    {
      icon: '£',
      title: 'Financing options available',
      description: 'Flexible payment plans and financing solutions to make renewable energy accessible for everyone.'
    },
    {
      icon: '📈',
      title: 'Proven track record',
      description: 'Thousands of successful installations and satisfied customers across residential, commercial, and industrial sectors.'
    }
  ]

  const team = [
    {
      name: 'Shaun Martin',
      role: 'General Manager',
      image: 'SM',
      linkedinUrl: 'https://www.linkedin.com/in/shaun-martin-b2596426/'
    },
    {
      name: 'Kelly Bugler',
      role: 'Operations Manager',
      image: 'KB',
      linkedinUrl: 'https://www.linkedin.com/in/kelly-bugler/'
    },
    {
      name: 'Tom Marshall',
      role: 'Director',
      image: 'TM',
      linkedinUrl: 'https://www.linkedin.com/in/tombat/'
    },
    {
      name: 'Matt Gavin',
      role: 'Director',
      image: 'MG',
      linkedinUrl: 'https://www.linkedin.com/in/matt-margav-660a54112/'
    }
  ]

  const impactStats = [
    {
      value: '20+',
      label: 'Years of expertise'
    },
    {
      value: '100+',
      label: 'Solar Installations'
    },
    {
      value: ' 1 MW+',
      label: 'Power capacity'
    },
    {
      value: '£10M+',
      label: 'Saved on energy bills'
    }
  ]


  return (
    <section className="about-page">
      {/* Hero Section with Carousel */}
      <div className="about-hero-section">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <div className="about-hero-content">
              <span className="about-hero-tag">ABOUT</span>
              <h1 className="about-hero-title">Your trusted solar energy partner</h1>
              <p className="about-hero-description">
                Learn how storing excess solar power can reduce your electricity bills and increase energy independence.
              </p>
            </div>
          </ScrollAnimation>
          <div className="about-hero-carousel">
            <ImageCarousel images={heroImages} autoScroll={true} interval={3100} />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="our-story-section">
        <div className="container">
          <div className="our-story-content">
            <ScrollAnimation animation="fadeInRight" delay={200}>
              <div className="our-story-image">
                <img 
                  src={gallery4} 
                  alt="MarGav Solar team" 
                  className="story-image"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInLeft" delay={400}>
              <div className="our-story-text">
                <h2 className="our-story-title">Our story</h2>
                <p className="our-story-paragraph">
                  At <BrandName /> we are dedicated to transforming the way homes and businesses access energy. Our mission is simple: to provide smart, sustainable, and cost-effective renewable energy solutions that reduce reliance on fossil fuels and lower electricity bills.
                </p>
                <p className="our-story-paragraph">
                  To make clean energy accessible and affordable for everyone by delivering high-quality renewable energy solutions that drive sustainability, efficiency, and energy independence.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-section">
        <div className="container">
          <div className="why-choose-header">
            <ScrollAnimation animation="fadeInUp" delay={0}>
              <span className="why-choose-label">WHY US</span>
              <div className="why-choose-title-row">
                <h2 className="why-choose-title">Why choose <BrandName className="inline-brand" />?</h2>
                <p className="why-choose-intro">
                  We take pride in delivering high-quality, future-proof renewable energy solutions. With years of experience and a team of certified experts, we ensure every project meets the highest standards of performance and reliability.
                </p>
              </div>
            </ScrollAnimation>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3 className="benefit-card-title">{benefit.title}</h3>
                  <p className="benefit-card-text">{benefit.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section-new" id="team">
        <div className="container">
          <div className="team-header">
            <ScrollAnimation animation="fadeInUp" delay={0}>
              <span className="team-label">OUR TEAM</span>
              <div className="team-title-row">
                <h2 className="team-main-title">
                  The amazing team behind <span className="team-title-highlight"><BrandName /></span>
                </h2>
                <p className="team-description">
                  Our founding team has over 50+ years of combined Customer Support and Technology experience.
                </p>
              </div>
            </ScrollAnimation>
          </div>
          <div className="team-members-row">
            {team.map((member, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="team-member-card">
                  <div className="team-member-avatar">
                    <div className="avatar-placeholder">{member.image}</div>
                  </div>
                  <h3 className="team-member-name-new">{member.name}</h3>
                  <p className="team-member-role-new">{member.role}</p>
                    <div className="team-member-links">
                      {member.linkedinUrl ? (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`LinkedIn profile of ${member.name}`}
                          title="LinkedIn"
                          className="team-link"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11.846 20H3.692V9h3.462v11zM5.5 7.654c-1.108 0-2.004-.898-2.004-2.006 0-1.108.896-2.004 2.004-2.004 1.108 0 2.006.896 2.006 2.004 0 1.108-.898 2.006-2.006 2.006zM20.308 20h-3.462v-5.746c0-1.369-.027-3.129-1.907-3.129-1.909 0-2.201 1.492-2.201 3.031V20h-3.462V9h3.324v1.507h.047c.463-.877 1.595-1.803 3.283-1.803 3.511 0 4.159 2.312 4.159 5.316V20z"/>
                          </svg>
                        </a>
                      ) : (
                        <span
                          className="team-link disabled"
                          aria-disabled="true"
                          title="LinkedIn (coming soon)"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11.846 20H3.692V9h3.462v11zM5.5 7.654c-1.108 0-2.004-.898-2.004-2.006 0-1.108.896-2.004 2.004-2.004 1.108 0 2.006.896 2.006 2.004 0 1.108-.898 2.006-2.006 2.006zM20.308 20h-3.462v-5.746c0-1.369-.027-3.129-1.907-3.129-1.909 0-2.201 1.492-2.201 3.031V20h-3.462V9h3.324v1.507h.047c.463-.877 1.595-1.803 3.283-1.803 3.511 0 4.159 2.312 4.159 5.316V20z"/>
                          </svg>
                        </span>
                      )}
                    </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="impact-section">
        <div className="container">
          <div className="impact-content">
            <ScrollAnimation animation="fadeInUp" delay={0}>
              <h2 className="impact-title">Delivering Measurable Impact</h2>
            </ScrollAnimation>
            <div className="impact-stats">
              {impactStats.map((stat, index) => (
                <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                  <div className="impact-stat-card">
                    <div className="impact-stat-value">{stat.value}</div>
                    <div className="impact-stat-label">{stat.label}</div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FAQ />
    </section>
  )
}

export default About
