import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync, statSync } from 'fs'
import { extname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

const distPath = join(__dirname, 'dist')
const indexPath = join(distPath, 'index.html')

// Serve static files (assets like JS, CSS, images) from the dist directory
// Use a custom middleware that checks if file exists before serving
app.use((req, res, next) => {
  const ext = extname(req.path)
  
  // Only try to serve static files for assets (JS, CSS, images, etc.)
  if (ext && ext !== '.html') {
    const filePath = join(distPath, req.path)
    
    try {
      // Check if file exists and is a file (not directory)
      if (existsSync(filePath)) {
        const stats = statSync(filePath)
        if (stats.isFile()) {
          // File exists, use express.static to serve it
          return express.static(distPath)(req, res, next)
        }
      }
    } catch (err) {
      // Error checking file, pass through
    }
    
    // File doesn't exist, pass to next middleware
    next()
  } else {
    // No extension or HTML file - pass to catch-all to serve index.html
    next()
  }
})

// Handle client-side routing - return index.html for ALL routes
// This catches all routes including /schedule, /about, etc.
app.get('*', (req, res) => {
  console.log(`Serving index.html for route: ${req.path}`)
  
  // Check if index.html exists
  if (!existsSync(indexPath)) {
    console.error('ERROR: index.html not found at:', indexPath)
    return res.status(500).send('Error: index.html not found in dist directory')
  }
  
  try {
    const html = readFileSync(indexPath, 'utf8')
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  } catch (error) {
    console.error('Error reading index.html:', error)
    res.status(500).send('Error loading the application')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Serving static files from: ${distPath}`)
  if (existsSync(indexPath)) {
    console.log(`✓ index.html found`)
  } else {
    console.error(`✗ index.html NOT found at: ${indexPath}`)
  }
})

