import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import { readFileSync, existsSync, readdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Automatically detect the build folder
const possibleBuildFolders = ['dist', 'build', 'public']
let distPath = possibleBuildFolders.find(folder => existsSync(join(__dirname, folder)))

if (!distPath) {
  console.error('❌ No build folder found. Checked: ', possibleBuildFolders.join(', '))
  process.exit(1)
}

distPath = join(__dirname, distPath)
const indexPath = join(distPath, 'index.html')

if (!existsSync(indexPath)) {
  console.error(`❌ index.html not found in ${distPath}`)
  process.exit(1)
}

console.log(`✅ Serving static files from: ${distPath}`)
console.log(`✅ index.html found at: ${indexPath}`)

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
