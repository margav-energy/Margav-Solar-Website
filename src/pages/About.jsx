import React from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from '../components/ScrollAnimation'
import ImageCarousel from '../components/ImageCarousel'
import teamMemberImage from '../assets/team member.png'
import installationImage from '../assets/Installation.png'
import consultationImage from '../assets/Consultation.png'
import assessmentImage from '../assets/Property Assessment & Quotation.png'
import aftercareImage from '../assets/Aftercare & Support.png'
import energyPlanImage from '../assets/Energy Plan.png'
import './About.css'

const About = () => {
  // Images for the hero carousel
  const heroImages = [
    { src: installationImage, alt: 'Solar panel installation' },
    { src: consultationImage, alt: 'Solar energy consultation' },
    { src: assessmentImage, alt: 'Property assessment' },
    { src: installationImage, alt: 'Professional installation' },
    { src: consultationImage, alt: 'Expert consultation' }
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
      image: 'SM'
    },
    {
      name: 'Kelly Bugler',
      role: 'Operations Manager',
      image: 'KB'
    },
    {
      name: 'Tom Marshall',
      role: 'Director',
      image: 'TM'
    },
    {
      name: 'Matt Gavin',
      role: 'Director',
      image: 'MG'
    }
  ]

  const impactStats = [
    {
      value: '15+',
      label: 'Years of expertise'
    },
    {
      value: '100+',
      label: 'Solar Installations'
    },
    {
      value: '2 MW+',
      label: 'Power capacity'
    },
    {
      value: '£500K+',
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
            <ImageCarousel images={heroImages} autoScroll={true} interval={3000} />
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
                  src={teamMemberImage} 
                  alt="Margav Solar team" 
                  className="story-image"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInLeft" delay={400}>
              <div className="our-story-text">
                <h2 className="our-story-title">Our story</h2>
                <p className="our-story-paragraph">
                  At Margav Solar, we are dedicated to transforming the way homes and businesses access energy. Our mission is simple: to provide smart, sustainable, and cost-effective renewable energy solutions that reduce reliance on fossil fuels and lower electricity bills.
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
                <h2 className="why-choose-title">Why choose Margav Solar?</h2>
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
                  The amazing team behind <span className="team-title-highlight">Margav Solar</span>
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
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="impact-section">
        <div className="container">
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
          <ScrollAnimation animation="fadeInUp" delay={500}>
            <div className="impact-image-wrapper">
              <img 
                src={installationImage} 
                alt="Solar installation impact" 
                className="impact-image"
              />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

export default About
