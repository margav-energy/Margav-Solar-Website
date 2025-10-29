import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from '../components/ScrollAnimation'
import heroImage from '../assets/hero.png'
import energyPlanImage from '../assets/Energy Plan.png'
import installationImage from '../assets/Installation.png'
import consultationImage from '../assets/Consultation.png'
import assessmentImage from '../assets/Property Assessment & Quotation.png'
import aftercareImage from '../assets/Aftercare & Support.png'
import './BlogPage.css'

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const blogPosts = [
    {
      id: 1,
      title: 'How to Maximize Your Solar Panel Efficiency in 2025',
      excerpt: 'Discover the latest tips and strategies to get the most out of your solar energy system and reduce your energy bills. Learn about panel positioning, maintenance, and optimizing your system for maximum output.',
      date: 'October 15, 2025',
      category: 'Tips & Guides',
      image: heroImage,
      readTime: '5 min read',
      author: 'Margav Solar Team',
      tags: ['Solar Efficiency', 'Maintenance', 'Energy Savings'],
      featured: true
    },
    {
      id: 2,
      title: 'Understanding Battery Storage Systems for UK Homes',
      excerpt: 'Learn how battery storage can help you store excess solar energy and become more energy independent. We break down the benefits, costs, and considerations for UK homeowners.',
      date: 'October 8, 2025',
      category: 'Technology',
      image: energyPlanImage,
      readTime: '7 min read',
      author: 'Margav Solar Team',
      tags: ['Battery Storage', 'Energy Independence'],
      featured: false
    },
    {
      id: 3,
      title: 'The Complete Guide to Solar Panel Installation Costs',
      excerpt: 'Everything you need to know about solar panel installation costs, government incentives, and long-term savings. Make an informed decision about your solar investment.',
      date: 'October 1, 2025',
      category: 'Finance',
      image: installationImage,
      readTime: '6 min read',
      author: 'Margav Solar Team',
      tags: ['Installation', 'Costs', 'Incentives'],
      featured: false
    },
    {
      id: 4,
      title: 'Solar Energy Grants and Incentives in the UK 2025',
      excerpt: 'Stay up-to-date with the latest government grants, feed-in tariffs, and incentives available for UK homeowners installing solar panels.',
      date: 'September 24, 2025',
      category: 'Finance',
      image: consultationImage,
      readTime: '8 min read',
      author: 'Margav Solar Team',
      tags: ['Grants', 'Incentives', 'Government'],
      featured: false
    },
    {
      id: 5,
      title: 'EV Charger Installation: What You Need to Know',
      excerpt: 'Thinking about installing an EV charger at home? Learn about the different types, installation requirements, and how to combine it with your solar system.',
      date: 'September 18, 2025',
      category: 'Technology',
      image: assessmentImage,
      readTime: '6 min read',
      author: 'Margav Solar Team',
      tags: ['EV Chargers', 'Electric Vehicles'],
      featured: false
    },
    {
      id: 6,
      title: 'Maintaining Your Solar Panel System: A Complete Guide',
      excerpt: 'Regular maintenance is key to keeping your solar panels performing at their best. Here\'s everything you need to know about solar panel maintenance.',
      date: 'September 12, 2025',
      category: 'Tips & Guides',
      image: aftercareImage,
      readTime: '7 min read',
      author: 'Margav Solar Team',
      tags: ['Maintenance', 'Care', 'Optimization'],
      featured: false
    }
  ]

  const categories = ['All', 'Tips & Guides', 'Technology', 'Finance']

  const featuredPost = blogPosts.find(post => post.featured)
  const latestPosts = blogPosts.filter(post => !post.featured)

  const filteredPosts = activeCategory === 'All' 
    ? latestPosts 
    : latestPosts.filter(post => post.category === activeCategory)

  const searchedPosts = searchQuery 
    ? filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredPosts

  return (
    <section className="blog-page">
      {/* Header Section */}
      <div className="blog-header-section">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <div className="blog-header-content">
              <span className="blog-header-tag">Insights & Research</span>
              <h1 className="blog-header-title">
                <span className="blog-title-main">Margav Solar</span>
                <span className="blog-title-subtitle">Insights Hub</span>
              </h1>
              <p className="blog-header-tagline">
                Stay informed with the latest insights, research, and innovations in solar energy technology. 
                Discover how renewable energy is transforming UK homes for a more sustainable future.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="blog-filters-section">
        <div className="container">
          <div className="blog-filters-content">
            <div className="blog-search-wrapper">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
              <span className="blog-search-icon">🔍</span>
            </div>
            <div className="blog-category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`blog-category-filter ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Featured Article */}
        {featuredPost && (
          <div className="blog-featured-section">
            <div className="blog-section-header">
              <span className="blog-section-label">📄 Featured Article</span>
              <h2 className="blog-section-title">Editor's Pick</h2>
            </div>
            <ScrollAnimation animation="fadeInUp" delay={200}>
              <article className="blog-featured-card">
                <div className="blog-featured-image">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="blog-featured-image-img"
                  />
                  <div className="blog-featured-image-overlay"></div>
                  <div className="blog-featured-category">{featuredPost.category}</div>
                </div>
                <div className="blog-featured-content">
                  <div className="blog-featured-meta">
                    <span className="blog-featured-date">📅 {featuredPost.date}</span>
                    <span className="blog-featured-readtime">⏱️ {featuredPost.readTime}</span>
                  </div>
                  <h3 className="blog-featured-title">{featuredPost.title}</h3>
                  <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
                  <div className="blog-featured-author">
                    <span className="blog-author-icon">👤</span>
                    {featuredPost.author}
                  </div>
                  <div className="blog-featured-tags">
                    {featuredPost.tags.map((tag, index) => (
                      <span key={index} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="blog-featured-actions">
                    <Link to="/" className="btn btn-blog-primary">
                      Read Article →
                    </Link>
                    <div className="blog-action-icons">
                      <button className="blog-icon-btn" aria-label="Bookmark">
                        <span>🔖</span>
                      </button>
                      <button className="blog-icon-btn" aria-label="Share">
                        <span>📤</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollAnimation>
          </div>
        )}

        {/* Latest Articles */}
        <div className="blog-latest-section">
          <div className="blog-section-header">
            <div>
              <h2 className="blog-section-title">Latest Articles</h2>
              <p className="blog-articles-count">{searchedPosts.length} articles found</p>
            </div>
          </div>
          <div className="blog-posts-grid">
            {searchedPosts.map((post, index) => (
              <ScrollAnimation key={post.id} animation="fadeInUp" delay={index * 100}>
                <article className="blog-post-card">
                  <Link to="/" className="blog-post-link">
                    <div className="blog-post-image">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="blog-post-image-img"
                      />
                      <div className="blog-post-image-overlay"></div>
                      <div className="blog-post-category">{post.category}</div>
                    </div>
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span className="blog-post-date">📅 {post.date}</span>
                        <span className="blog-post-readtime">⏱️ {post.readTime}</span>
                      </div>
                      <h3 className="blog-post-title">{post.title}</h3>
                      <p className="blog-post-excerpt">{post.excerpt}</p>
                      <div className="blog-post-footer">
                        <div className="blog-post-author">
                          <span className="blog-author-icon">👤</span>
                          {post.author}
                        </div>
                        <div className="blog-post-footer-right">
                          <div className="blog-post-tags">
                            <span className="blog-tag-small">{post.tags[0]}</span>
                            {post.tags.length > 1 && (
                              <span className="blog-tag-count">+{post.tags.length - 1}</span>
                            )}
                          </div>
                          <div className="blog-post-actions">
                            <Link to="/" className="blog-readmore-btn">
                              Read More →
                            </Link>
                            <button className="blog-icon-btn-small" aria-label="Bookmark">
                              🔖
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog
