# Quick Setup Guide for EmailJS Careers Template

## Error: Template ID Not Found

If you're seeing the error "The template ID not found", follow these steps:

### Step 1: Verify Your EmailJS Account
1. Go to https://dashboard.emailjs.com/admin/templates
2. Make sure you're logged into the correct EmailJS account
3. Check which **Service ID** you're using (currently: `service_xpxec2s`)

### Step 2: Create the Template
1. In EmailJS dashboard, go to **Email Templates**
2. Click **"Create New Template"**
3. The template will be automatically assigned an ID (it might be `template_4u9wpo7` or a different one)

### Step 3: Get the Template ID
1. After creating the template, you'll see the Template ID in the template settings
2. Copy this ID (it will look like `template_xxxxxxx`)

### Step 4: Update the Configuration
Update `src/config/emailjs.js` with your actual template ID:

```javascript
export const EMAILJS_CAREERS_TEMPLATE_ID = 'YOUR_ACTUAL_TEMPLATE_ID_HERE'
```

Or set it in your `.env` file:
```
VITE_EMAILJS_CAREERS_TEMPLATE_ID=your_actual_template_id
```

### Step 5: Configure the Template

**Email Settings:**
- **To Email**: `lucy@margav.energy`
- **CC Email**: `{{applicant_email}}`
- **From Name**: MarGav Energy Careers
- **Reply To**: `{{applicant_email}}`
- **Subject**: `New Job Application: {{job_title}}`

**Template Content:**
- Copy the HTML from `CAREERS_EMAIL_TEMPLATE_WITH_CV.html`
- Paste it into the EmailJS template editor

**Template Variables to Use:**
- `{{to_email}}`
- `{{applicant_email}}`
- `{{applicant_name}}`
- `{{applicant_phone}}`
- `{{applicant_notes}}`
- `{{job_title}}`
- `{{cover_letter}}`
- `{{cv_file_name}}`
- `{{cv_file_type}}`
- `{{cv_file_data}}`
- `{{cv_file_size}}`
- `{{timestamp}}`
- `{{source}}`

### Step 6: Verify Service ID Match
Make sure the template is created in the same **Service** as your `EMAILJS_SERVICE_ID`:
- Current Service ID: `service_xpxec2s`
- The template must be in this service

### Step 7: Test
1. Save the template in EmailJS
2. Test the form submission
3. Check the browser console for any errors

## Common Issues

**Issue**: Template ID not found
- **Solution**: Make sure the template exists in the same service as your SERVICE_ID

**Issue**: Template exists but still getting error
- **Solution**: Check that you're using the correct Service ID and Public Key

**Issue**: Email not sending
- **Solution**: Verify the email service is connected and active in EmailJS

## Need Help?

1. Check EmailJS dashboard: https://dashboard.emailjs.com/admin/templates
2. Verify Service ID matches: https://dashboard.emailjs.com/admin/integration
3. Check template variables are correctly named in the template

