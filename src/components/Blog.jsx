import React from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from './ScrollAnimation'
import './Blog.css'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Maximize Your Solar Panel Efficiency in 2024',
      excerpt: 'Discover the latest tips and strategies to get the most out of your solar energy system and reduce your energy bills.',
      date: 'March 15, 2024',
      category: 'Tips & Guides',
      image: 'solar-efficiency',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Understanding Battery Storage Systems for UK Homes',
      excerpt: 'Learn how battery storage can help you store excess solar energy and become more energy independent.',
      date: 'March 8, 2024',
      category: 'Technology',
      image: 'battery-storage',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'The Complete Guide to Solar Panel Installation Costs',
      excerpt: 'Everything you need to know about solar panel installation costs, government incentives, and long-term savings.',
      date: 'March 1, 2024',
      category: 'Finance',
      image: 'installation-costs',
      readTime: '6 min read'
    }
  ]

  return (
    <section className="blog section" id="blog">
      <div className="container">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className="blog-header">
            <h2 className="blog-main-title">Latest Insights & News</h2>
            <p className="blog-subtitle">
              Stay informed about solar energy trends, tips, and industry updates from our expert team.
            </p>
            <Link to="/blog" className="btn btn-primary">View All Posts →</Link>
          </div>
        </ScrollAnimation>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <ScrollAnimation key={post.id} animation="fadeInUp" delay={index * 150}>
              <article className="blog-card">
                <Link to={`/blog/${post.id}`} className="blog-card-link">
                  <div className="blog-card-image">
                    <div className={`blog-image-placeholder ${post.image}`}>
                      <div className="blog-image-overlay"></div>
                    </div>
                    <div className="blog-card-category">{post.category}</div>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">{post.date}</span>
                      <span className="blog-card-readtime">{post.readTime}</span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-card-readmore">Read More →</span>
                  </div>
                </Link>
              </article>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog

