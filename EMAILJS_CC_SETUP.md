# How to Set Up CC (Copy to Applicant) in EmailJS

## Overview
To ensure a copy of the email is automatically sent to the applicant, you need to configure the **CC Email** field in your EmailJS template settings.

## Step-by-Step Instructions

### 1. Log in to EmailJS Dashboard
- Go to: https://dashboard.emailjs.com/admin/templates
- Log in to your EmailJS account

### 2. Open Your Template
- Find your careers template (Template ID: `template_4u9wpo7` or your custom ID)
- Click on it to edit

### 3. Configure Email Settings
In the template settings, find the **Email Settings** section and configure:

- **To Email**: `lucy@margav.energy`
- **CC Email**: `{{applicant_email}}` ← **This is the key setting!**
- **From Name**: MarGav Energy Careers
- **Reply To**: `{{applicant_email}}`
- **Subject**: `New Job Application: {{job_title}}`

### 4. How It Works
- When the form is submitted, EmailJS will:
  1. Send the email to `lucy@margav.energy` (To Email)
  2. Automatically CC the email to `{{applicant_email}}` (the applicant's email from the form)
  3. The applicant will receive an exact copy of the email sent to Lucy

### 5. Verify the Setup
1. **Test the Template**:
   - Use EmailJS's "Test" feature
   - Enter a test email in the `{{applicant_email}}` variable
   - Send the test email
   - Check that both `lucy@margav.energy` and the test email receive the email

2. **Test from the Website**:
   - Submit a test application from your website
   - Check that both emails are received correctly

## Important Notes

- ✅ The `{{applicant_email}}` variable is automatically populated from the form submission
- ✅ The CC happens automatically - no code changes needed
- ✅ Both recipients receive the exact same email content
- ✅ The applicant will see their email in the CC field

## Troubleshooting

### CC Not Working?
1. **Check Template Settings**:
   - Make sure "CC Email" field is set to `{{applicant_email}}` (not a static email)
   - Verify the variable name matches exactly (case-sensitive)

2. **Check Email Service**:
   - Some email services have limits on CC functionality
   - Gmail should work fine with CC

3. **Check Spam Folder**:
   - The CC email might go to spam
   - Ask the applicant to check their spam/junk folder

4. **Verify Variable**:
   - Make sure `applicant_email` is being sent in the template parameters
   - Check browser console for the EmailJS configuration log

## Alternative: BCC (Blind Carbon Copy)

If you prefer BCC (where recipients don't see each other's emails):

- **BCC Email**: `{{applicant_email}}`
- This hides the applicant's email from Lucy and vice versa

## Current Configuration

Based on your code, the template parameters include:
```javascript
applicant_email: formData.email  // This is sent to EmailJS
```

The EmailJS template should have:
- **CC Email**: `{{applicant_email}}`

This will automatically send a copy to the applicant when the email is sent to Lucy.

