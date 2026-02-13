# Popup Not Showing - Debug Guide

## Quick Fix: Clear localStorage

The popup remembers if you've seen it before. To test it again:

1. **Open Browser Console** (Press `F12`)
2. **Go to Console tab**
3. **Type this and press Enter:**
   ```javascript
   localStorage.removeItem('leadPopupSeen')
   localStorage.removeItem('leadPopupSubmitted')
   ```
4. **Refresh the page**
5. **Wait 10 seconds** - popup should appear

## Check What's Blocking It

1. **Open Browser Console** (Press `F12`)
2. **Go to Console tab**
3. **Type this and press Enter:**
   ```javascript
   console.log('leadPopupSeen:', localStorage.getItem('leadPopupSeen'))
   console.log('leadPopupSubmitted:', localStorage.getItem('leadPopupSubmitted'))
   ```

If either shows `"true"`, that's why the popup isn't showing.

## Debug Console Messages

After refreshing the page, you should see these messages in the console:

- ✅ `Lead Popup Check: { hasSeenPopup: null, hasSubmitted: null }` - Good! Popup will show
- ✅ `Popup will show in 10 seconds...` - Timer started
- ✅ `Showing popup now!` - Popup should appear
- ✅ `Popup visibility: true` - Popup is visible

If you see:
- ❌ `Popup blocked - user has already seen or submitted` - Clear localStorage (see above)

## Test the Popup

### Method 1: Clear and Wait
1. Clear localStorage (see above)
2. Refresh page
3. Wait 10 seconds

### Method 2: Force Show (for testing)
1. Open Browser Console
2. Type:
   ```javascript
   localStorage.clear()
   window.location.reload()
   ```
3. Wait 10 seconds

### Method 3: Exit Intent
1. Clear localStorage
2. Move your mouse to the very top of the browser window (as if leaving)
3. Popup should appear immediately

## Common Issues

### Issue: "Popup blocked - user has already seen or submitted"
**Solution:** Clear localStorage (see Quick Fix above)

### Issue: No console messages at all
**Solution:** 
- Check if the component is loaded
- Check browser console for React errors
- Make sure you're on a page where the popup component is included

### Issue: Console shows "Popup will show in 10 seconds..." but nothing happens
**Solution:**
- Check if there are any JavaScript errors in console
- Check if `isVisible` state is being set to `true`
- Look for "Popup visibility: true" message

## Production Behavior

In production, the popup will:
- ✅ Show once per user (remembers in localStorage)
- ✅ Not show again after submission
- ✅ Not show again after user closes it
- ✅ Show on every new device/browser (localStorage is per browser)

## Reset for Testing

To completely reset for testing:
```javascript
// In browser console:
localStorage.removeItem('leadPopupSeen')
localStorage.removeItem('leadPopupSubmitted')
localStorage.removeItem('cookieConsent')
window.location.reload()
```
