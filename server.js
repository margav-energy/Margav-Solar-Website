import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Set dist folder
const distPath = join(__dirname, 'dist')
const indexPath = join(distPath, 'index.html')

// Check if dist folder and index.html exist
if (!existsSync(distPath)) {
  console.error('❌ ERROR: dist folder not found:', distPath)
  process.exit(1)
}

if (!existsSync(indexPath)) {
  console.error('❌ ERROR: index.html not found in dist folder:', indexPath)
  process.exit(1)
}

console.log('✅ Serving static files from:', distPath)
console.log('✅ index.html found at:', indexPath)

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  next()
})

// Serve static files from dist
app.use(express.static(distPath))

// SPA fallback: serve index.html for all other routes
app.get('*', (req, res) => {
  console.log(`→ SPA fallback triggered for: ${req.originalUrl}`)
  res.sendFile(indexPath)
})

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ ERROR:', err)
  res.status(500).send('Internal Server Error')
})

app.listen(PORT, () => {
  console.log('========================================')
  console.log('🚀 Server running...')
  console.log(`📦 Port: ${PORT}`)
  console.log(`📁 Dist folder: ${distPath}`)
  console.log(`📄 Index file: ${indexPath}`)
  console.log('========================================\n')
})
