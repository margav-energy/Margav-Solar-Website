# EmailJS Template Setup for Careers Application

## Template Configuration

### Template Settings
- **Template Name**: Careers Application Form
- **Template ID**: `template_careers_application` (or your custom ID)
- **Subject**: `New Job Application: {{job_title}}`

### Email Configuration
- **To Email**: `lucy@margav.energy`
- **CC Email**: `{{applicant_email}}` (This will automatically CC the applicant)
- **From Name**: MarGav Energy Careers
- **Reply To**: `{{applicant_email}}`

## Template Variables

Use these variables in your EmailJS template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{to_email}}` | Recipient email (lucy@margav.energy) | lucy@margav.energy |
| `{{applicant_email}}` | Applicant's email (for CC) | applicant@example.com |
| `{{applicant_name}}` | Applicant's full name | John Smith |
| `{{applicant_phone}}` | Applicant's phone number | 01234 567890 |
| `{{applicant_notes}}` | Optional notes from applicant | Additional information... |
| `{{job_title}}` | Job title they're applying for | Call Centre (Renewable Energy) |
| `{{cover_letter}}` | Cover letter text (optional) | Full cover letter content... |
| `{{cv_file_name}}` | CV/Resume file name | John_Smith_CV.pdf |
| `{{cv_file_type}}` | CV/Resume MIME type | application/pdf |
| `{{cv_file_data}}` | CV/Resume base64 encoded data | (base64 string) |
| `{{cv_file_size}}` | CV/Resume file size | 245.67 KB |
| `{{timestamp}}` | Submission timestamp | Monday, 8 January 2026, 14:30 |
| `{{source}}` | Source identifier | MarGav Energy Website - Careers Application |

## Setup Instructions

1. **Log in to EmailJS** (https://www.emailjs.com/)

2. **Create a New Template**:
   - Go to Email Templates
   - Click "Create New Template"
   - Name it "Careers Application"

3. **Configure Email Settings**:
   - **To Email**: `lucy@margav.energy`
   - **CC Email**: `{{applicant_email}}`
   - **From Name**: MarGav Energy Careers
   - **Reply To**: `{{applicant_email}}`
   - **Subject**: `New Job Application: {{job_title}}`

4. **Copy the HTML Template**:
   - Open `CAREERS_EMAIL_TEMPLATE_WITH_CV.html`
   - Copy the entire HTML content
   - Paste it into the EmailJS template editor

5. **Save the Template**:
   - Note the Template ID (e.g., `template_xxxxx`)
   - Update `EMAILJS_CAREERS_TEMPLATE_ID` in `src/config/emailjs.js` with your Template ID

6. **Test the Template**:
   - Use EmailJS's test feature to verify the template works
   - Make sure the CC email is working correctly

## Handling CV File Attachments

### Current Implementation (Base64)

The CV file is currently sent as base64-encoded data in the `{{cv_file_data}}` variable. EmailJS in the browser doesn't support direct file attachments, so the file is included as base64 data.

**Options for handling the CV file:**

1. **Include in Email Body (Current)**:
   - The base64 data is available in `{{cv_file_data}}`
   - You can create a data URI link in the email template
   - Example: `<a href="data:{{cv_file_type}};base64,{{cv_file_data}}" download="{{cv_file_name}}">Download CV</a>`

2. **Backend Service (Recommended)**:
   - Set up a backend endpoint to receive the file
   - Upload to cloud storage (AWS S3, Cloudinary, etc.)
   - Send the file URL in the email instead of base64
   - See `src/utils/fileUpload.js` for utility functions

3. **EmailJS Attachment Service**:
   - Use EmailJS's attachment feature (requires server-side handling)
   - Configure attachment handling in EmailJS settings

### Recommended: Backend File Upload

For production, we recommend implementing a backend service:

1. **Create a backend endpoint** (Node.js/Express example):
   ```javascript
   app.post('/api/upload-cv', upload.single('cv'), async (req, res) => {
     // Upload to cloud storage (AWS S3, Cloudinary, etc.)
     const fileUrl = await uploadToStorage(req.file)
     res.json({ url: fileUrl })
   })
   ```

2. **Update the form submission** in `Careers.jsx` and `JobListing.jsx`:
   ```javascript
   // Upload file first
   const formData = new FormData()
   formData.append('cv', formData.cvFile)
   const uploadResponse = await fetch('/api/upload-cv', {
     method: 'POST',
     body: formData
   })
   const { url } = await uploadResponse.json()
   
   // Then send email with URL
   const templateParams = {
     // ... other params
     cv_file_url: url
   }
   ```

3. **Update email template** to use `{{cv_file_url}}` instead of base64 data

## Important Notes

- The template uses `{{applicant_email}}` in the CC field to automatically send a copy to the applicant
- The template handles cases where CV file might not be provided
- Cover letter is optional (will show "Not provided" if empty)
- All text is properly formatted for email clients
- The template includes company registration details in the footer

## Environment Variables

Add to your `.env` file (optional):
```
VITE_EMAILJS_CAREERS_TEMPLATE_ID=your_template_id_here
```

If not set, it will use the default value from `src/config/emailjs.js`.

## File Upload Utility

The `src/utils/fileUpload.js` file provides utility functions for:
- Converting files to base64
- Validating CV files
- Creating download links
- Future extension for cloud storage uploads

See the file for detailed documentation on each function.
