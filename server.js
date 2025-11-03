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

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.path || req.url}`)
  console.log(`  Original URL: ${req.originalUrl || req.url}`)
  console.log(`  Query: ${JSON.stringify(req.query)}`)
  next()
})

// Serve static files from dist directory
// Express static will serve files if they exist, otherwise call next()
app.use(express.static(distPath, {
  // Log when static files are served
  setHeaders: (res, path, stat) => {
    console.log(`  ✓ Static file served: ${path}`)
  }
}))

// Catch-all handler for ALL routes and HTTP methods
// This serves index.html for any route that doesn't match a static file
// This allows React Router to handle client-side routing
app.all('*', (req, res) => {
  console.log(`  → Catch-all handler triggered for: ${req.method} ${req.path}`)
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
    console.log(`  ✓ Response sent successfully`)
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
