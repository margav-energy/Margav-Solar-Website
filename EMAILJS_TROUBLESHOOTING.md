# EmailJS Template ID Not Found - Troubleshooting Guide

## Problem
You're getting the error: "The template ID not found" even though you have the template ID `template_4u9wpo7`.

## Common Causes & Solutions

### 1. Template is in a Different Service ⚠️ (MOST COMMON)

**Problem**: Templates must be in the same **Service** as the Service ID you're using.

**Current Configuration:**
- Service ID: `service_xpxec2s`
- Template ID: `template_4u9wpo7`

**Solution Steps:**

1. **Check which service your template is in:**
   - Go to https://dashboard.emailjs.com/admin/templates
   - Find template `template_4u9wpo7`
   - Look at which **Service** it belongs to (shown in the template list or settings)

2. **Option A: Move template to correct service**
   - If template is in a different service, you need to either:
     - Create a new template in service `service_xpxec2s`, OR
     - Update the Service ID to match where the template is

3. **Option B: Update Service ID**
   - If the template is in a different service (e.g., `service_rfga4ug`), update the config:
   ```javascript
   // In src/config/emailjs.js
   export const EMAILJS_SERVICE_ID = 'service_where_template_is_located'
   ```

### 2. Template Not Published/Active

**Check:**
- Go to https://dashboard.emailjs.com/admin/templates
- Find `template_4u9wpo7`
- Make sure it's **Published** (not in draft)
- Check if there's a "Publish" or "Save" button that needs to be clicked

### 3. Wrong EmailJS Account

**Check:**
- Make sure you're logged into the correct EmailJS account
- The Public Key `ux9Oo2Pc2NKWpl4rq` should match the account where the template exists
- Verify the account at: https://dashboard.emailjs.com/admin/integration

### 4. Template ID Typo

**Verify:**
- Double-check the template ID is exactly `template_4u9wpo7` (case-sensitive)
- No extra spaces or characters
- Check in EmailJS dashboard: https://dashboard.emailjs.com/admin/templates

## Quick Diagnostic Steps

### Step 1: Verify Template Exists
1. Go to https://dashboard.emailjs.com/admin/templates
2. Search for `template_4u9wpo7`
3. If found, note which **Service** it's in
4. If not found, the template doesn't exist - create it

### Step 2: Check Service Match
1. Go to https://dashboard.emailjs.com/admin/integration
2. Find Service ID `service_xpxec2s`
3. Check if template `template_4u9wpo7` is listed under this service
4. If not, the template is in a different service

### Step 3: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Submit the form
4. Look for the "EmailJS Configuration" log
5. Verify the Service ID and Template ID match what's in EmailJS

### Step 4: Test with Existing Template
Try using an existing template that works (like `template_00uncww` or `template_gcy68b5`) to verify the service is working:

```javascript
// Temporarily test with a known working template
export const EMAILJS_CAREERS_TEMPLATE_ID = 'template_00uncww' // Test with this
```

If this works, the issue is specifically with `template_4u9wpo7`.

## Recommended Solution

### If Template is in Different Service:

**Option 1: Use the service where template exists**
```javascript
// If template_4u9wpo7 is in service_rfga4ug, update:
export const EMAILJS_SERVICE_ID = 'service_rfga4ug'
export const EMAILJS_PUBLIC_KEY = '9fjvy6g6-1Zk9_pqK' // If using Lucy's account
```

**Option 2: Create new template in correct service**
1. Go to service `service_xpxec2s`
2. Create a new template
3. Copy the HTML from `CAREERS_EMAIL_TEMPLATE_WITH_CV.html`
4. Configure it with the settings
5. Get the new template ID
6. Update config with new template ID

## Verification Checklist

- [ ] Template `template_4u9wpo7` exists in EmailJS dashboard
- [ ] Template is in the same Service as `service_xpxec2s`
- [ ] Template is Published/Active (not draft)
- [ ] Public Key `ux9Oo2Pc2NKWpl4rq` matches the EmailJS account
- [ ] Template ID is exactly `template_4u9wpo7` (no typos)
- [ ] Browser console shows correct Service ID and Template ID
- [ ] Email service connection is active (not expired)

## Still Not Working?

1. **Check EmailJS Dashboard Logs:**
   - Go to https://dashboard.emailjs.com/admin/logs
   - Look for recent errors related to the template

2. **Contact EmailJS Support:**
   - If template exists but still not found, contact EmailJS support
   - Provide: Service ID, Template ID, Public Key

3. **Alternative: Create Fresh Template:**
   - Create a new template in the correct service
   - Use the new template ID
   - This ensures everything is set up correctly

