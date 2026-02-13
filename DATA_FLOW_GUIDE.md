# Data Flow Guide - Where Your Data Goes

This document explains where all the data collected on your website is stored and sent.

## 📊 Data Flow Overview

```
User Interaction
    ↓
Website (React App)
    ↓
    ├─→ Browser localStorage (User's Device)
    ├─→ Google Tag Manager (GTM)
    │   └─→ Google Analytics
    │   └─→ Facebook Pixel (if enabled)
    │   └─→ Other tracking services
    └─→ Google Sheets (Lead Data)
```

---

## 1. 🍪 Cookie Consent Data

### Where it's stored:
- **Browser localStorage** (on user's device)
- **Key:** `cookieConsent`
- **Format:** JSON object with preferences

### What's stored:
```json
{
  "essential": true,
  "analytics": false,
  "marketing": false
}
```

### Also sent to:
- **Google Tag Manager (GTM)** - Event: `cookie_consent`
- This allows you to track consent rates in Google Analytics

### Location:
- **Browser:** User's device only (not on your servers)
- **Access:** Only accessible by your website on the same domain
- **Persistence:** Stored until user clears browser data

---

## 2. 📝 Lead Capture Form Data

### Where it goes:
1. **Google Sheets** (Primary destination)
   - Your Google Sheet (set up via Google Apps Script)
   - Columns: Timestamp, Name, Email, Phone, Source
   - Access: You can view/edit in Google Sheets

2. **Google Tag Manager** (Tracking)
   - Event: `lead_capture`
   - Data: lead_source, lead_name, lead_email, page_path
   - Used for: Analytics and conversion tracking

### Data Flow:
```
Lead Form Submission
    ↓
Google Apps Script (Web App)
    ↓
Google Sheet (Your Spreadsheet)
    ↓
You can view/edit in Google Sheets
```

### Setup Required:
- You need to set up Google Apps Script (see `GOOGLE_SHEETS_SETUP.md`)
- Add `VITE_GOOGLE_SCRIPT_URL` to your `.env` file
- The script URL points to your Google Sheet

### Access Your Data:
1. Go to [Google Sheets](https://sheets.google.com/)
2. Open your "MarGav Solar Leads" spreadsheet
3. All form submissions appear as new rows

---

## 3. 📈 Google Tag Manager (GTM) Data

### Where it goes:
GTM acts as a hub that sends data to multiple services:

#### A. Google Analytics 4 (GA4)
- **What:** Page views, events, user behavior
- **Access:** [analytics.google.com](https://analytics.google.com)
- **Data includes:**
  - Page views (`page_view` events)
  - Lead captures (`lead_capture` events)
  - Cookie consent (`cookie_consent` events)
  - User demographics, device info, location

#### B. Facebook Pixel (if configured)
- **What:** Conversion tracking, remarketing
- **Access:** Facebook Ads Manager
- **Data includes:** Page views, conversions, custom events

#### C. Other Services (if configured)
- LinkedIn Insight Tag
- Twitter Pixel
- Any other tracking pixels you add

### Data Flow:
```
Website Events
    ↓
GTM dataLayer
    ↓
Google Tag Manager
    ↓
    ├─→ Google Analytics 4
    ├─→ Facebook Pixel
    └─→ Other Services
```

### Access Your Data:
- **Google Analytics:** [analytics.google.com](https://analytics.google.com)
- **Facebook:** Facebook Ads Manager
- **GTM Preview:** Use GTM Preview mode to see events in real-time

---

## 4. 📄 Page View Tracking

### Where it goes:
- **Google Tag Manager dataLayer**
- Then forwarded to Google Analytics 4

### What's tracked:
- Every page navigation
- Page path (e.g., `/about`, `/contact`)
- Page title
- Timestamp

### Access:
- Google Analytics → Reports → Realtime
- Google Analytics → Reports → Engagement → Pages and screens

---

## 5. 💾 Browser localStorage Data

### What's stored locally (on user's device):

1. **Cookie Consent:**
   - Key: `cookieConsent`
   - Value: User's cookie preferences

2. **Lead Popup Status:**
   - Key: `leadPopupSeen` - Whether user has seen the popup
   - Key: `leadPopupSubmitted` - Whether user has submitted the form

### Important Notes:
- ✅ Stored only on user's device
- ✅ Not sent to any server
- ✅ Used to remember user preferences
- ✅ Can be cleared by user (clearing browser data)

---

## 📍 Quick Reference: Where to Find Your Data

| Data Type | Location | How to Access |
|-----------|---------|--------------|
| **Lead Form Submissions** | Google Sheets | Go to Google Sheets → Open your leads spreadsheet |
| **Website Analytics** | Google Analytics | Go to analytics.google.com → Your property |
| **Cookie Consent Rates** | Google Analytics | GA4 → Events → `cookie_consent` |
| **Lead Conversion Tracking** | Google Analytics | GA4 → Events → `lead_capture` |
| **Real-time Events** | GTM Preview | GTM Dashboard → Preview mode |
| **User Preferences** | Browser localStorage | User's device only (not accessible by you) |

---

## 🔒 Privacy & Security

### Data Storage:
- **Lead Data:** Stored in your Google Sheet (you control access)
- **Analytics Data:** Stored by Google (subject to Google's privacy policy)
- **User Preferences:** Stored locally on user's device (not accessible by you)

### Data Access:
- **You:** Can access Google Sheets and Google Analytics data
- **Google:** Processes analytics data (see Google Privacy Policy)
- **Users:** Can clear their localStorage data anytime

### Compliance:
- ✅ GDPR compliant (users can opt-out of non-essential cookies)
- ✅ Cookie consent is tracked and stored
- ✅ Privacy Policy explains data usage
- ✅ Users can withdraw consent

---

## 🛠️ Troubleshooting

### Lead data not appearing in Google Sheets?
1. Check your `.env` file has `VITE_GOOGLE_SCRIPT_URL`
2. Verify the Google Apps Script is deployed
3. Check browser console for errors
4. See `GOOGLE_SHEETS_SETUP.md` for setup instructions

### Analytics not tracking?
1. Check GTM is installed correctly
2. Verify tags are published in GTM
3. Check GTM Preview mode to see if events fire
4. Verify cookie consent (analytics cookies need consent)

### Cookie preferences not saving?
1. Check browser allows localStorage
2. User may have cleared browser data
3. Check browser console for errors

---

## 📞 Need Help?

- **Google Sheets Setup:** See `GOOGLE_SHEETS_SETUP.md`
- **GTM Setup:** See `GTM_BEGINNER_GUIDE.md`
- **Lead Capture:** See `LEAD_CAPTURE_README.md`

---

## Summary

1. **Lead Form Data** → Google Sheets (you control this)
2. **Tracking Data** → Google Tag Manager → Google Analytics / Facebook Pixel
3. **Cookie Preferences** → Browser localStorage (user's device)
4. **Page Views** → GTM → Google Analytics

All data flows are GDPR compliant and respect user consent preferences.
