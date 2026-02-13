# Lead Popup Fixes - Troubleshooting Guide

## ✅ Issues Fixed

### 1. Popup Delay Changed
- **Before:** 30 seconds
- **After:** 10 seconds
- ✅ Fixed in `src/components/LeadCapturePopup.jsx`

### 2. Thank You Banner Keeps Popping Up
- **Issue:** Success message was showing repeatedly
- **Fix:** Added proper localStorage checks to prevent popup from showing again after submission
- ✅ Fixed - popup now remembers submission and won't show again

### 3. Google Sheets Not Populating
- **Issue:** Form data not appearing in Google Sheet
- **Fix:** Changed submission method to use hidden iframe form (better CORS handling)
- **Status:** Fixed, but may need additional troubleshooting (see below)

---

## 🔧 Google Sheets Troubleshooting

If data still isn't appearing in your Google Sheet, check these:

### Step 1: Verify Your Script URL
1. Check your `.env` file has the correct URL:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
2. Make sure there are no extra spaces or quotes
3. Restart your dev server after changing `.env`

### Step 2: Test Your Google Apps Script
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Click the function dropdown → Select `test`
4. Click Run ▶️
5. Check if a test row appears in your sheet

### Step 3: Check Script Permissions
1. In Apps Script, click **Deploy** → **Manage deployments**
2. Make sure "Who has access" is set to **Anyone**
3. If you changed it, click **Edit** → **New version** → **Deploy**

### Step 4: Check Browser Console
1. Open your website
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Submit the form
5. Look for:
   - ✅ "Submitting to Google Sheets: ..." (should show your data)
   - ✅ "Form submitted successfully to Google Sheets"
   - ❌ Any red error messages

### Step 5: Verify Script Code
Make sure your Google Apps Script has this exact code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var phone = e.parameter.phone || '';
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    var source = e.parameter.source || 'Lead Capture Popup';
    
    sheet.appendRow([
      new Date(timestamp),
      name,
      email,
      phone,
      source
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 6: Check Sheet Headers
Make sure your Google Sheet has these exact headers in row 1:
- **A1:** Timestamp
- **B1:** Name
- **C1:** Email
- **D1:** Phone
- **E1:** Source

### Step 7: Test with Direct URL
Try accessing your script URL directly in browser:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?name=Test&email=test@test.com&phone=123&timestamp=2024-01-01&source=Test
```

If this works, you should see a row added to your sheet.

---

## 🐛 Common Issues

### Issue: "Google Script URL not configured"
**Solution:** 
- Create a `.env` file in your project root
- Add: `VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec`
- Restart dev server: `npm run dev`

### Issue: CORS Errors
**Solution:** 
- The iframe method should handle CORS
- Make sure your script is deployed with "Anyone" access
- Check browser console for specific error messages

### Issue: Data Appears But Wrong Format
**Solution:**
- Check your sheet headers match exactly
- Verify the script code matches the format above
- Check timestamp format in the sheet

### Issue: Popup Shows Again After Submission
**Solution:**
- Clear browser localStorage: Open console, type `localStorage.clear()`
- Or manually: `localStorage.removeItem('leadPopupSubmitted')`
- Then test again

---

## 📝 Testing Checklist

- [ ] `.env` file has correct `VITE_GOOGLE_SCRIPT_URL`
- [ ] Dev server restarted after adding `.env`
- [ ] Google Apps Script is deployed
- [ ] Script has "Anyone" access
- [ ] Sheet has correct headers
- [ ] Browser console shows "Submitting to Google Sheets"
- [ ] Browser console shows "Form submitted successfully"
- [ ] Data appears in Google Sheet
- [ ] Popup doesn't show again after submission

---

## 🔍 Debug Mode

To see what's being sent, check the browser console:
1. Open Developer Tools (F12)
2. Go to Console tab
3. Submit the form
4. You should see:
   ```
   Submitting to Google Sheets: {name: "...", email: "...", phone: "..."}
   Form submitted successfully to Google Sheets
   ```

If you see errors, they'll help identify the issue.

---

## 📞 Still Not Working?

1. **Check Google Apps Script Execution Logs:**
   - In Apps Script, click **Executions** (clock icon)
   - See if your script ran and if there were errors

2. **Try the Test Function:**
   - In Apps Script, run the `test()` function
   - This will add a test row to your sheet

3. **Verify Script URL:**
   - Copy the exact URL from Apps Script deployment
   - Make sure it ends with `/exec` (not `/dev`)

4. **Check Network Tab:**
   - In Developer Tools, go to **Network** tab
   - Submit the form
   - Look for requests to `script.google.com`
   - Check if they're successful (status 200)

---

## ✅ Success Indicators

When everything is working, you should see:
- ✅ Console log: "Submitting to Google Sheets"
- ✅ Console log: "Form submitted successfully"
- ✅ Success message appears in popup
- ✅ Popup closes after 3 seconds
- ✅ New row appears in Google Sheet
- ✅ Popup doesn't show again on page refresh
