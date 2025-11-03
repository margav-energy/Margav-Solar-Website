import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync, statSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

const distPath = join(__dirname, 'dist')
const indexPath = join(distPath, 'index.html')

// Custom middleware to serve static files only if they exist
app.use((req, res, next) => {
  // Check if this is a request for a static asset (has file extension)
  const pathParts = req.path.split('/')
  const lastPart = pathParts[pathParts.length - 1]
  
  // If it has a file extension and is not index.html, try to serve it
  if (lastPart.includes('.') && lastPart !== 'index.html') {
    const filePath = join(distPath, req.path)
    
    // Check if file exists
    if (existsSync(filePath)) {
      try {
        const stats = statSync(filePath)
        if (stats.isFile()) {
          // File exists - use express.static to serve it
          return express.static(distPath)(req, res, () => {
            // If static middleware couldn't serve it, pass to next
            if (!res.headersSent) {
              next()
            }
          })
        }
      } catch (err) {
        // Error checking file, pass to next
      }
    }
  }
  
  // Not a static file or doesn't exist - pass to catch-all
  next()
})

// Catch-all handler: serves index.html for ALL routes
// This allows React Router to handle routing client-side
app.get('*', (req, res) => {
  console.log(`[${new Date().toISOString()}] Serving index.html for: ${req.method} ${req.path}`)
  
  if (!existsSync(indexPath)) {
    console.error('ERROR: index.html not found at:', indexPath)
    return res.status(500).send('Error: index.html not found in dist directory')
  }
  
  try {
    const html = readFileSync(indexPath, 'utf8')
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
  } catch (error) {
    console.error('Error reading index.html:', error)
    res.status(500).send('Error loading the application')
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Serving static files from: ${distPath}`)
  console.log(existsSync(indexPath) ? '✓ index.html found' : '✗ index.html NOT found')
})
