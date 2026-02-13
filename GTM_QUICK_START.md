# GTM Quick Start - Tag Setup

## 🎯 Most Common Setup: Google Analytics 4 (GA4)

### Step-by-Step:

1. **Get your GA4 Measurement ID**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Admin → Data Streams → Your Web Stream
   - Copy your Measurement ID (starts with `G-`)

2. **In GTM Dashboard (GTM-PHHLB637):**

   **Tag 1: GA4 Configuration**
   - Tags → New → Tag Configuration → Google Analytics: GA4 Configuration
   - Measurement ID: `G-XXXXXXXXXX` (your ID)
   - Triggering: All Pages
   - Name: `GA4 - Configuration`
   - Save

   **Tag 2: GA4 Page View Event**
   - Tags → New → Tag Configuration → Google Analytics: GA4 Event
   - Configuration Tag: Select "GA4 - Configuration"
   - Event Name: `page_view`
   - Triggering: Create new trigger
     - Trigger Type: Custom Event
     - Event name: `page_view`
     - Name: `Page View Trigger`
   - Name: `GA4 - Page View`
   - Save

3. **Test & Publish**
   - Click Preview → Enter your site URL
   - Navigate your site → Check tags fire
   - Click Submit → Publish

## 📊 What You'll Track

With the setup above, you'll automatically track:
- ✅ All page views (including React Router navigations)
- ✅ User behavior across your SPA
- ✅ Page paths and titles
- ✅ All standard GA4 events

## 🔍 Verify It's Working

1. **In GTM Preview Mode:**
   - Navigate your site
   - See `page_view` events in the left panel
   - See both GA4 tags firing

2. **In Google Analytics:**
   - Go to Reports → Realtime
   - You should see active users and page views

3. **In Browser Console:**
   ```javascript
   window.dataLayer
   // Should show page_view events
   ```

## 🎨 Next Steps

Once GA4 is working, you can add:
- **Facebook Pixel** (for Meta ads)
- **LinkedIn Insight Tag** (for LinkedIn ads)
- **Custom conversion events** (form submissions, button clicks)
- **E-commerce tracking** (if you sell products)

See `GTM_SETUP.md` for detailed instructions on all tag types.
