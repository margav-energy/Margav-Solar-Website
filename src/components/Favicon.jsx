import { useEffect } from 'react'

const Favicon = () => {
  useEffect(() => {
    // Remove existing favicons
    const existingLinks = document.querySelectorAll("link[rel*='icon']")
    existingLinks.forEach(link => link.remove())
    
    // Create new favicon link
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/x-icon'
    link.href = '/favicon.ico'
    
    // Create shortcut icon link
    const shortcutLink = document.createElement('link')
    shortcutLink.rel = 'shortcut icon'
    shortcutLink.type = 'image/x-icon'
    shortcutLink.href = '/favicon.ico'
    
    // Create apple touch icon
    const appleLink = document.createElement('link')
    appleLink.rel = 'apple-touch-icon'
    appleLink.href = '/favicon.ico'
    
    document.head.appendChild(link)
    document.head.appendChild(shortcutLink)
    document.head.appendChild(appleLink)
  }, [])

  return null
}

export default Favicon

