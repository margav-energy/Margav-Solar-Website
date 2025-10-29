# Margav Solar - Website

A modern, responsive website for Margav Solar, a branch of Margav Energy focused on solar energy generation to combat rising energy costs.

## Features

- 🎨 Modern, clean design with custom brand colors
- 📱 Fully responsive across all devices
- ⚡ React-based with Vite for fast development
- 🌱 Solar energy focused content and design
- 🎯 Multi-section layout including:
  - Hero section with call-to-action
  - Process/Steps section
  - Features showcase
  - Product display
  - Statistics section
  - Contact/CTA section
  - Footer with navigation

## Brand Colors

- **Blue**: `#3333ccff`
- **Black**: `#000000ff`
- **White**: `#ffffffff`
- **Green Gradient**: `#66cc66ff` → `#33cc66ff` → `#00cc99ff`

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

### EmailJS Configuration

To enable the "Request a Quote" and "Schedule" form functionality, you need to set up EmailJS:

1. Create a `.env` file in the root directory
2. Get your EmailJS credentials from https://www.emailjs.com/
3. Add the following to your `.env` file:
```env
VITE_EMAILJS_SERVICE_ID=service_xpxec2s
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```
4. Template IDs are configured in `src/config/emailjs.js`:
   - Request Quote: `template_00uncww`
   - Schedule/Contact: `template_gcy68b5`

#### Troubleshooting EmailJS Errors

**Error 412 - Gmail API Invalid Grant:**
If you see "Email service connection expired" error, your Gmail OAuth connection in EmailJS has expired. To fix:
1. Go to https://www.emailjs.com/ → Dashboard
2. Navigate to **Email Services** → Select `service_xpxec2s`
3. Click **"Reconnect"** or **"Authorize"** for Gmail
4. Grant the necessary permissions
5. Save and test the forms again

**Common Error Codes:**
- **412**: Gmail/Email service connection expired (reconnect in dashboard)
- **400**: Invalid email configuration (check template variables match)
- **429**: Rate limit exceeded (wait a few minutes)

## Project Structure

```
margav-solar/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Navigation header with dropdown
│   │   ├── Hero.jsx         # Hero section
│   │   ├── Process.jsx      # Three-step process section
│   │   ├── Features.jsx     # Features and solar integration
│   │   ├── Products.jsx     # Product showcase
│   │   ├── Statistics.jsx   # Statistics and metrics
│   │   ├── Contact.jsx      # CTA/Contact section
│   │   └── Footer.jsx       # Footer with navigation
│   ├── styles/
│   │   ├── index.css        # Global styles and CSS variables
│   │   └── App.css          # App-level styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Customization

All brand colors are defined as CSS variables in `src/styles/index.css`. Modify these values to update colors across the site:

```css
:root {
  --color-blue: #3333ccff;
  --color-black: #000000ff;
  --color-white: #ffffffff;
  --gradient-green: linear-gradient(135deg, #66cc66ff 0%, #33cc66ff 50%, #00cc99ff 100%);
}
```

## Technologies

- React 18
- Vite
- CSS3 with CSS Variables
- Modern ES6+ JavaScript

## License

© 2024 Margav Solar. All rights reserved.

