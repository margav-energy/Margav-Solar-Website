import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { readFileSync, existsSync, statSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

const distPath = join(__dirname, 'dist')
const indexPath = join(distPath, 'index.html')

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.path || req.url}`)
  console.log(`  Original URL: ${req.originalUrl || req.url}`)
  next()
})

// Custom middleware to serve static files ONLY if they exist
// This prevents express.static from sending 404 for routes
app.use((req, res, next) => {
  const path = req.path || req.url
  const ext = extname(path)
  
  // Only try to serve static files if request has a file extension
  // and it's not index.html (which should be handled by catch-all)
  if (ext && path !== '/index.html') {
    const filePath = join(distPath, path)
    
    // Check if file exists
    if (existsSync(filePath)) {
      try {
        const stats = statSync(filePath)
        if (stats.isFile()) {
          // File exists - serve it using express.static
          console.log(`  ✓ Serving static file: ${path}`)
          return express.static(distPath)(req, res, (err) => {
            // If error occurred, pass to catch-all
            if (err || res.statusCode === 404) {
              console.log(`  → Static file not served, passing to catch-all`)
              next()
            }
          })
        }
      } catch (err) {
        // Error checking file, pass to catch-all
        console.log(`  → Error checking file, passing to catch-all`)
        next()
      }
    } else {
      // File doesn't exist, pass to catch-all
      console.log(`  → File doesn't exist, passing to catch-all: ${path}`)
      next()
    }
  } else {
    // No file extension or index.html - definitely a route, pass to catch-all
    console.log(`  → Route request (no extension), passing to catch-all: ${path}`)
    next()
  }
})

// Catch-all handler for ALL routes and HTTP methods
// This serves index.html for any route that doesn't match a static file
// This allows React Router to handle client-side routing
app.all('*', (req, res) => {
  const path = req.path || req.url
  console.log(`  → Catch-all handler triggered for: ${req.method} ${path}`)
  console.log(`  → Serving index.html (React Router will handle routing)`)
  
  if (!existsSync(indexPath)) {
    console.error(`  ✗ ERROR: index.html not found at: ${indexPath}`)
    console.error(`  ✗ Dist path exists: ${existsSync(distPath)}`)
    return res.status(500).send('Error: index.html not found in dist directory')
  }
  
  try {
    const html = readFileSync(indexPath, 'utf8')
    console.log(`  ✓ index.html read successfully (${html.length} bytes)`)
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
    console.log(`  ✓ Response sent successfully with status 200`)
  } catch (error) {
    console.error(`  ✗ Error reading index.html:`, error)
    res.status(500).send('Error loading the application')
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`  ✗ ERROR:`, err)
  res.status(500).send('Internal Server Error')
})

app.listen(PORT, () => {
  console.log('\n========================================')
  console.log('🚀 Server starting...')
  console.log(`📦 Port: ${PORT}`)
  console.log(`📁 Dist path: ${distPath}`)
  console.log(`📄 Index file: ${indexPath}`)
  console.log(`📂 Dist exists: ${existsSync(distPath)}`)
  console.log(`📄 Index exists: ${existsSync(indexPath)}`)
  console.log('========================================\n')
  console.log('✅ Server is running and ready to handle requests')
  console.log('📝 All incoming requests will be logged below\n')
})
