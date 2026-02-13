# Google Tag Manager Setup Guide

This guide explains how to configure Google Tag Manager (GTM) for your MarGav Solar website.

## Quick Setup

1. **Get your GTM Container ID**
   - Go to [Google Tag Manager](https://tagmanager.google.com/)
   - Create a new container or select an existing one
   - Copy your Container ID (format: `GTM-XXXXXXX`)

2. **Update the GTM ID in your code**
   - Open `index.html` in the root directory
   - Find `'GTM-XXXXXXX'` (appears twice: once in the `<head>` script and once in the `<body>` noscript)
   - Replace both instances with your actual GTM Container ID

3. **Update the config file (optional)**
   - Open `src/config/gtm.js`
   - Update `GTM_ID` to match your Container ID
   - This is used for programmatic tracking (page views, custom events)

## How It Works

### Automatic Page View Tracking
The `GoogleTagManager` component automatically tracks page views when users navigate between routes in your React app. This ensures all page views are captured, even in a Single Page Application (SPA).

### Custom Event Tracking
You can track custom events by importing and using the `pushToDataLayer` function:

```javascript
import { pushToDataLayer } from './config/gtm';

// Track a button click
pushToDataLayer({
  event: 'button_click',
  button_name: 'Request Quote',
  page_path: window.location.pathname
});

// Track form submission
pushToDataLayer({
  event: 'form_submit',
  form_name: 'Contact Form',
  form_location: 'Contact Page'
});
```

### Available Functions

- `pushToDataLayer(data)` - Push custom events/data to GTM dataLayer
- `trackPageView(url)` - Manually track a page view
- `initDataLayer()` - Initialize the dataLayer (usually not needed, handled automatically)

## Setting Up Tags in GTM

### Accessing Your GTM Dashboard

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Select your container (`GTM-PHHLB637`)
3. You'll see the GTM workspace with **Tags**, **Triggers**, and **Variables** in the left sidebar

### Setting Up Google Analytics 4 (GA4)

**Step 1: Create a GA4 Configuration Tag**

1. Click **Tags** → **New**
2. Click **Tag Configuration** → Select **Google Analytics: GA4 Configuration**
3. Enter your **Measurement ID** (format: `G-XXXXXXXXXX`)
   - Find this in your Google Analytics 4 property under Admin → Data Streams
4. Under **Triggering**, click to add a trigger
5. Select **All Pages** (or create a custom trigger)
6. Name your tag: `GA4 - Configuration`
7. Click **Save**

**Step 2: Create a GA4 Event Tag for Page Views**

1. Click **Tags** → **New**
2. Click **Tag Configuration** → Select **Google Analytics: GA4 Event**
3. Select your **Configuration Tag** (the one you just created)
4. Set **Event Name** to: `page_view`
5. Under **Triggering**, click to add a trigger
6. Click **+** to create a new trigger
7. Select **Custom Event** trigger type
8. Set **Event name** to: `page_view`
9. Name the trigger: `Page View - Custom`
10. Click **Save**
11. Name your tag: `GA4 - Page View`
12. Click **Save**

**Why two tags?** The Configuration tag sets up GA4, and the Event tag sends page views when your React app navigates.

### Setting Up Facebook Pixel (Meta Pixel)

1. Click **Tags** → **New**
2. Click **Tag Configuration** → Select **Custom HTML**
3. Paste your Facebook Pixel base code:
   ```html
   <script>
     !function(f,b,e,v,n,t,s)
     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
     n.queue=[];t=b.createElement(e);t.async=!0;
     t.src=v;s=b.getElementsByTagName(e)[0];
     s.parentNode.insertBefore(t,s)}(window, document,'script',
     'https://connect.facebook.net/en_US/fbevents.js');
     fbq('init', 'YOUR_PIXEL_ID');
     fbq('track', 'PageView');
   </script>
   <noscript>
     <img height="1" width="1" style="display:none"
     src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"/>
   </noscript>
   ```
4. Replace `YOUR_PIXEL_ID` with your actual Pixel ID
5. Under **Triggering**, select **All Pages**
6. Name your tag: `Facebook Pixel - Base Code`
7. Click **Save**

### Creating Custom Triggers

**Trigger for Page Views (already set up, but here's how to customize):**

1. Click **Triggers** → **New**
2. Select **Custom Event**
3. **Event name**: `page_view`
4. Name: `Page View Trigger`
5. Click **Save**

**Trigger for Specific Pages:**

1. Click **Triggers** → **New**
2. Select **Page View**
3. Select **Some Page Views**
4. Set conditions (e.g., Page Path contains `/request-quote`)
5. Name: `Request Quote Page`
6. Click **Save**

**Trigger for Button Clicks:**

1. Click **Triggers** → **New**
2. Select **Click - All Elements**
3. Select **Some Clicks**
4. Set condition: Click Element matches CSS selector `.cta-button` (or your button class)
5. Name: `CTA Button Click`
6. Click **Save**

### Using Variables

GTM automatically captures dataLayer variables. To use them:

1. Click **Variables** → **New**
2. Select **Data Layer Variable**
3. **Data Layer Variable Name**: `page_path` (or any variable you push)
4. Name: `Page Path`
5. Click **Save**

**Built-in Variables:**
- Enable **Page URL**, **Page Path**, **Page Title** under Variables → Configure

### Testing Your Tags

**Using GTM Preview Mode:**

1. Click **Preview** in the top right of GTM
2. Enter your website URL (e.g., `https://yoursite.com`)
3. Click **Connect**
4. A new window/tab will open with your site
5. Navigate through your site
6. The GTM Preview panel will show:
   - Which tags fired
   - Which triggers activated
   - DataLayer events and variables

**What to look for:**
- ✅ Tags should fire on page loads
- ✅ `page_view` events should trigger your GA4 event tag
- ✅ DataLayer should show your custom events

### Publishing Your Container

**Important:** Tags only work on your live site after publishing!

1. Click **Submit** in the top right
2. Add a **Version Name** (e.g., "Initial GA4 Setup")
3. Add **Version Description** (optional)
4. Click **Publish**
5. Your tags are now live!

### Common Tag Setup Checklist

- [ ] GA4 Configuration Tag (fires on All Pages)
- [ ] GA4 Page View Event Tag (fires on `page_view` custom event)
- [ ] Facebook Pixel (if needed)
- [ ] Any other third-party tracking pixels
- [ ] Test in Preview Mode
- [ ] Publish container

## Testing

1. **Preview Mode in GTM**
   - Use GTM's Preview mode to test your tags
   - Enter your website URL and click "Connect"
   - Navigate through your site to see events firing

2. **Browser Console**
   - Open browser DevTools
   - Check `window.dataLayer` to see events being pushed
   - You should see `page_view` events when navigating

3. **Google Analytics DebugView** (if using GA4)
   - If you've set up GA4 through GTM, use DebugView to see real-time events
   - Go to GA4 → Admin → DebugView
   - You should see events appearing in real-time

## Common Use Cases

### Track Button Clicks
```javascript
const handleButtonClick = () => {
  pushToDataLayer({
    event: 'cta_click',
    cta_text: 'Get Started',
    cta_location: 'Hero Section'
  });
  // ... rest of your click handler
};
```

### Track Form Submissions
```javascript
const handleFormSubmit = (formData) => {
  pushToDataLayer({
    event: 'form_submission',
    form_type: 'Contact Form',
    form_location: window.location.pathname
  });
  // ... rest of your submit handler
};
```

### Track Outbound Links
```javascript
const handleExternalLink = (url) => {
  pushToDataLayer({
    event: 'outbound_link_click',
    link_url: url,
    link_text: 'External Resource'
  });
};
```

## Files Modified

- `index.html` - Contains GTM script tags in `<head>` and `<body>`
- `src/config/gtm.js` - GTM configuration and utility functions
- `src/components/GoogleTagManager.jsx` - React component for page view tracking
- `src/App.jsx` - Integrated GoogleTagManager component

## Notes

- The GTM script loads asynchronously, so it won't block page rendering
- Page views are automatically tracked on route changes (React Router)
- The noscript iframe ensures tracking works even if JavaScript is disabled
- Make sure to update the GTM ID in both `index.html` and `src/config/gtm.js` for consistency

## Troubleshooting

**GTM not loading?**
- Check that you've replaced `GTM-XXXXXXX` with your actual Container ID
- Verify the GTM ID is correct in both locations (head script and body noscript)
- Check browser console for any errors

**Page views not tracking?**
- Ensure `GoogleTagManager` component is included in your App.jsx
- Check that React Router is working correctly
- Verify in browser console: `window.dataLayer` should contain events

**Events not showing in GTM?**
- Make sure you've published your GTM container
- Check GTM Preview mode to see if events are firing
- Verify your tags are configured correctly in GTM dashboard
