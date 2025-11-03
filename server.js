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

// Serve static files (assets like JS, CSS, images) from the dist directory
// When a file isn't found, Express will call next() which passes to our catch-all route
app.use(express.static(distPath))

// Handle client-side routing - return index.html for all routes
// This catches all routes that don't match static files
app.get('*', (req, res) => {
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

