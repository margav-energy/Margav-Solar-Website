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
app.use(express.static(distPath))

// Catch-all handler: must be defined after static middleware
// This serves index.html for all routes, allowing React Router to handle routing
app.get('*', (req, res) => {
  if (!existsSync(indexPath)) {
    console.error('ERROR: index.html not found at:', indexPath)
    return res.status(500).send('Error: index.html not found')
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
  console.log(`Server running on port ${PORT}`)
  console.log(`Serving from: ${distPath}`)
  console.log(existsSync(indexPath) ? '✓ index.html found' : '✗ index.html NOT found')
})
