# Lead Capture Popup - Quick Start

## ✅ What's Been Set Up

A lead capture popup has been added to your website that:
- ✅ Appears after 30 seconds OR when user tries to leave (exit intent)
- ✅ Collects: Name, Email, Phone Number
- ✅ Includes GDPR-compliant data usage disclaimer
- ✅ Syncs data to Google Sheets automatically
- ✅ Tracks submissions in Google Tag Manager
- ✅ Only shows once per user (uses localStorage)
- ✅ Responsive design matching your site style

## 🚀 Quick Setup (5 minutes)

### Step 1: Set Up Google Sheets Integration

Follow the detailed guide in **`GOOGLE_SHEETS_SETUP.md`** to:
1. Create a Google Sheet
2. Set up Google Apps Script
3. Get your Web App URL
4. Add it to your `.env` file

### Step 2: Add Environment Variable

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add this line:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual URL from Google Apps Script
4. Restart your dev server: `npm run dev`

### Step 3: Test It!

1. Visit your website
2. Wait 30 seconds OR move your mouse to the top of the page
3. Fill out the form
4. Check your Google Sheet - data should appear!

## 🎨 Customization

### Change When Popup Appears

Edit `src/components/LeadCapturePopup.jsx`:

```javascript
// Change delay (currently 30 seconds = 30000ms)
setTimeout(() => {
  setIsVisible(true)
}, 30000) // Change this number
```

### Disable Exit Intent

Remove or comment out the exit intent detection:

```javascript
// Comment out this section:
// const handleMouseLeave = (e) => { ... }
// document.addEventListener('mouseleave', handleMouseLeave)
```

### Change Popup Message

Edit the title and subtitle in `LeadCapturePopup.jsx`:

```javascript
<h2 className="lead-popup-title">Your Custom Title</h2>
<p className="lead-popup-subtitle">Your custom message here</p>
```

### Add Privacy Policy Link

The popup already includes a link to `/privacy`. Make sure you have a privacy policy page, or update the link:

```javascript
<a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
```

## 📊 Tracking

The popup automatically tracks submissions in Google Tag Manager with:
- Event: `lead_capture`
- Data: `lead_source`, `lead_name`, `lead_email`, `page_path`

You can create GTM tags to:
- Send leads to Google Analytics
- Track conversions in Facebook Pixel
- Send to CRM systems
- etc.

## 🔧 Troubleshooting

### Popup not appearing?
- Clear browser localStorage: `localStorage.clear()` in console
- Check browser console for errors
- Make sure you're not on a page that already showed it

### Data not saving to Google Sheets?
- Verify your `.env` file has the correct URL
- Make sure you restarted the dev server after adding `.env`
- Check Google Apps Script execution logs
- See `GOOGLE_SHEETS_SETUP.md` for detailed troubleshooting

### Popup showing too often?
- The popup uses localStorage to remember if user has seen it
- To reset: `localStorage.removeItem('leadPopupSeen')` in console
- Or clear all: `localStorage.clear()`

## 📝 Files Created

- `src/components/LeadCapturePopup.jsx` - Main popup component
- `src/components/LeadCapturePopup.css` - Styling
- `GOOGLE_SHEETS_SETUP.md` - Detailed Google Sheets setup guide
- `.env.example` - Example environment variable file

## 🎯 Next Steps

1. ✅ Set up Google Sheets (follow `GOOGLE_SHEETS_SETUP.md`)
2. ✅ Add your Google Script URL to `.env`
3. ✅ Test the popup
4. ✅ Customize the message/styling if needed
5. ✅ Set up GTM tags to track conversions
6. ✅ Create a Privacy Policy page (if you don't have one)

## 💡 Pro Tips

- Test in incognito mode to see the popup multiple times
- The popup won't show again after submission (stored in localStorage)
- You can manually trigger it for testing by clearing localStorage
- Consider A/B testing different messages to improve conversion
