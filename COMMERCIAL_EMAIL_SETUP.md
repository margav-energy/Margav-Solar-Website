# Commercial CTA Email Template Setup Guide

## Template Overview

This email template is designed for the Commercial CTA form that sends enquiries to both `sales@margav.energy` and `lucy@margav.energy`.

## EmailJS Template Setup

### Step 1: Create EmailJS Templates

You need to create **two separate templates** (one for each EmailJS account):

1. **Sales Account Template** (sends to sales@margav.energy)
2. **Lucy Account Template** (sends to lucy@margav.energy)

### Step 2: Copy the Template HTML

Copy the entire content from `COMMERCIAL_EMAIL_TEMPLATE.html` and paste it into your EmailJS template editor.

### Step 3: Configure Template Settings

In your EmailJS template settings:

1. **Template Name**: "Commercial Enquiry" (or any name you prefer)
2. **Subject**: "New Commercial Enquiry from {{company_name}}"
3. **To Email**: 
   - Sales template: `sales@margav.energy`
   - Lucy template: `lucy@margav.energy`
4. **From Name**: "MarGav Solar Website"
5. **From Email**: Your EmailJS service email

### Step 4: Template Variables

The template uses the following variables that are automatically sent from the form:

- `{{name}}` - Customer's full name
- `{{company_name}}` - Company name
- `{{email}}` - Customer's email address
- `{{telephone}}` - Customer's telephone number
- `{{preferred_time}}` - Preferred contact time (8am - 11am, 11am - 2pm, or 2pm - 6pm)
- `{{timestamp}}` - Submission timestamp (formatted)
- `{{source}}` - Source identifier ("MarGav Energy Website - Commercial CTA")

### Step 5: Test the Template

1. Use EmailJS's "Test" feature to send a test email
2. Use sample data:
   - `{{name}}` = "John Doe"
   - `{{company_name}}` = "Acme Corporation"
   - `{{email}}` = "john@acme.com"
   - `{{telephone}}` = "+44 123 456 7890"
   - `{{preferred_time}}` = "8am - 11am"
   - `{{timestamp}}` = "Monday, 1 January 2024, 10:30"
   - `{{source}}` = "MarGav Energy Website - Commercial CTA"

## Template Features

- ✅ Professional, clean design
- ✅ Mobile-responsive layout
- ✅ Clickable email and phone links
- ✅ Clear visual hierarchy
- ✅ Brand colors (blue #3333cc, green #66cc66)
- ✅ Highlighted preferred contact time
- ✅ Information about the enquiry type

## Notes

- The template uses inline CSS for maximum email client compatibility
- All styling is done with inline styles (required for email)
- The template is designed to work in Gmail, Outlook, and other major email clients
- Emojis are used for visual interest (they work in most modern email clients)

## Troubleshooting

If emails aren't sending or formatting incorrectly:

1. **Check variable names**: Make sure all variable names match exactly (case-sensitive)
2. **Test in EmailJS**: Use the "Test" button in EmailJS to verify the template works
3. **Check email service**: Ensure your EmailJS service is properly connected
4. **Verify credentials**: Double-check your Service ID, Template ID, and Public Key in the `.env` file

## Template Structure

The template includes:

1. **Header**: "New Commercial Enquiry Received"
2. **Alert Box**: Summary of the enquiry
3. **Contact Info**: Name and company with icon
4. **Contact Details Table**: Email, phone, preferred time, timestamp, source
5. **Info Box**: Additional context about the enquiry

## Customization

You can customize:

- Colors: Change `#3333cc` (blue) and `#66cc66` (green) to match your brand
- Font sizes: Adjust the `font-size` values
- Layout: Modify padding and margins
- Content: Edit the text in the info box or alert message

