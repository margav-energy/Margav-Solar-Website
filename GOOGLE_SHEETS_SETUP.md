# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets to automatically collect lead data from the popup form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it something like "MarGav Solar Leads"
4. In the first row, add these column headers:
   - **A1:** Timestamp
   - **B1:** Name
   - **C1:** Email
   - **D1:** Phone
   - **E1:** Source

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get form data
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var phone = e.parameter.phone || '';
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    var source = e.parameter.source || 'Lead Capture Popup';
    
    // Add data to the sheet
    sheet.appendRow([
      new Date(timestamp), // Timestamp
      name,                // Name
      email,               // Email
      phone,               // Phone
      source               // Source
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for testing)
function test() {
  var testData = {
    parameter: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      timestamp: new Date().toISOString(),
      source: 'Test'
    }
  };
  doPost(testData);
}
```

4. Click **Save** (💾 icon) or press `Ctrl+S`
5. Name your project: "MarGav Solar Lead Capture"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the deployment settings:
   - **Description:** "Lead Capture Form Handler"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
5. Click **Deploy**
6. **IMPORTANT:** You'll see a popup asking for authorization:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. Copy the **Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Step 4: Add URL to Your Project

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add this line:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   Replace `YOUR_SCRIPT_ID` with the actual URL you copied

3. **Important:** Restart your development server after adding the `.env` file
   ```bash
   npm run dev
   ```

## Step 5: Test It

1. Visit your website
2. Wait 30 seconds or move your mouse to the top of the page (exit intent)
3. Fill out the popup form
4. Submit it
5. Check your Google Sheet - you should see the data appear!

## Troubleshooting

### Data not appearing in sheet?
- Make sure you clicked "Deploy" and copied the Web App URL
- Verify the URL is correct in your `.env` file
- Check that you authorized the script (Step 3, step 6)
- Restart your dev server after adding `.env`

### Getting CORS errors?
- This is normal! The code uses `mode: 'no-cors'` which means you won't see the response, but data will still be saved
- Check your Google Sheet to verify data is being saved

### Script not working?
- Make sure "Who has access" is set to "Anyone"
- Try redeploying: Deploy → Manage deployments → Edit → New version → Deploy

### Need to update the script?
- Make your changes in Apps Script
- Click **Deploy** → **Manage deployments**
- Click the pencil icon (Edit)
- Click **New version**
- Click **Deploy**
- No need to update the URL - it stays the same!

## Security Notes

- The Web App URL is public, but only your script can write to your sheet
- Consider adding rate limiting or validation in the script if needed
- The script only appends data - it cannot read or modify existing data without additional permissions

## Optional: Add Email Notifications

You can modify the script to send an email when a new lead is submitted:

```javascript
// Add this inside the doPost function, after sheet.appendRow:
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: 'New Lead: ' + name,
  body: 'New lead submitted:\n\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n' +
        'Source: ' + source
});
```

## Optional: Format the Sheet

You can format your sheet header row:
1. Select row 1
2. Make it bold (Ctrl+B)
3. Add background color
4. Freeze the row: View → Freeze → 1 row

This makes it easier to read as data accumulates!
