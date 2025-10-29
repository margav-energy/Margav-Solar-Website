import React from 'react'
import './ImageCarousel.css'

const ImageCarousel = ({ images, autoScroll = true, speed = 30 }) => {
  // Duplicate images multiple times for seamless infinite scroll
  const duplicatedImages = [...images, ...images, ...images, ...images]

  return (
    <div className="image-carousel">
      <div 
        className={`carousel-track ${autoScroll ? 'auto-scroll' : ''}`}
        style={{
          '--scroll-speed': `${speed}s`,
          '--item-count': images.length
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div 
            key={index} 
            className="carousel-slide"
          >
            <img 
              src={image.src} 
              alt={image.alt || `Carousel image ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel

