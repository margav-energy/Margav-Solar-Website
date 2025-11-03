import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

const distPath = join(__dirname, 'dist')
const indexPath = join(distPath, 'index.html')

// Serve static files from dist directory
// Express static will serve files if they exist, otherwise call next()
app.use(express.static(distPath))

// Catch-all handler for ALL routes and HTTP methods
// This serves index.html for any route that doesn't match a static file
// This allows React Router to handle client-side routing
app.use('*', (req, res) => {
  console.log(`[${new Date().toISOString()}] Serving index.html for: ${req.method} ${req.originalUrl || req.path}`)
  
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
