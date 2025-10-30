import React from 'react'

const BrandName = ({ className = '' }) => {
  const solarStyle = {
    color: '#3333ccff',
    WebkitTextFillColor: '#3333ccff',
    background: 'none',
    WebkitBackgroundClip: 'initial'
  }
  const margavStyle = {
    background: 'var(--gradient-green)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent'
  }
  return (
    <span className={className}>
      <span style={margavStyle}>MarGav</span>{' '}
      <span style={solarStyle}>Solar</span>
    </span>
  )
}

export default BrandName


