import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { readFileSync, existsSync, readdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Vite builds to 'dist' folder by default
const distPath = join(__dirname, 'dist')
const indexPath = join(distPath, 'index.html')

// Verify dist folder exists (created by npm run build)
if (!existsSync(distPath)) {
  console.error('❌ Build folder not found!')
  console.error(`   Expected: ${distPath}`)
  console.error('   Make sure "npm run build" runs successfully before starting the server.')
  process.exit(1)
}

// Verify index.html exists
if (!existsSync(indexPath)) {
  console.error('❌ index.html not found in build folder!')
  console.error(`   Expected: ${indexPath}`)
  console.error('   Make sure the build completed successfully.')
  process.exit(1)
}

console.log(`✅ Build folder found: ${distPath}`)
console.log(`✅ index.html found: ${indexPath}`)

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Serve static files if they exist
app.use(express.static(distPath))

// SPA fallback: serve index.html for any route not found
app.get('*', (req, res) => {
  res.sendFile(indexPath)
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ ERROR:', err)
  res.status(500).send('Internal Server Error')
})

app.listen(PORT, () => {
  console.log('========================================')
  console.log('🚀 Server running...')
  console.log(`📦 Port: ${PORT}`)
  console.log(`📁 Build folder: ${distPath}`)
  console.log('========================================\n')
})
