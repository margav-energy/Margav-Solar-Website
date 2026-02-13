// Updated Google Apps Script - Handles both GET and POST requests
// This version works with the image pixel method (GET) and form submission (POST)

function doGet(e) {
  // Handle GET requests (from image pixel method)
  return doPost(e);
}

function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get form data (works for both GET and POST)
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var phone = e.parameter.phone || '';
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    var source = e.parameter.source || 'Lead Capture Popup';
    
    // Log for debugging (check Execution logs in Apps Script)
    console.log('Received data:', {
      name: name,
      email: email,
      phone: phone,
      timestamp: timestamp,
      source: source
    });
    
    // Add data to the sheet
    sheet.appendRow([
      new Date(timestamp), // Timestamp
      name,                // Name
      email,               // Email
      phone,               // Phone
      source               // Source
    ]);

    // Send email notification
    try {
      MailApp.sendEmail({
        to: 'sales@margav.energy',
        subject: 'New Lead: ' + name,
        body: 'New lead submitted:\n\n' +
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n' +
            'Phone: ' + phone + '\n' +
            'Source: ' + source + '\n' +
            'Timestamp: ' + timestamp
      });
    } catch (emailError) {
      // Log email error but don't fail the whole operation
      console.error('Email error:', emailError);
    }
    
    // Return success response
    // For GET requests, return HTML with a 1x1 pixel image
    if (e.queryString) {
      return HtmlService.createHtmlOutput('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="1" height="1">');
    }
    
    // For POST requests, return JSON
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    console.error('Error in doPost:', error);
    
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
