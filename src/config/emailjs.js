// EmailJS configuration
// Set these in your .env file or update directly here
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xpxec2s'
export const EMAILJS_TEMPLATE_ID = 'template_00uncww' // For Request Quote form
export const EMAILJS_SCHEDULE_TEMPLATE_ID = 'template_gcy68b5' // For Schedule/Contact form
export const EMAILJS_CAREERS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CAREERS_TEMPLATE_ID || 'template_4u9wpo7' // For Careers Application form
// Note: If template_4u9wpo7 is in Lucy's service (service_rfga4ug), use EMAILJS_CAREERS_LUCY_SERVICE_ID instead
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ux9Oo2Pc2NKWpl4rq'

// Careers Application - Option to use Lucy's service if template is there
export const EMAILJS_CAREERS_LUCY_SERVICE_ID = import.meta.env.VITE_EMAILJS_CAREERS_LUCY_SERVICE_ID || 'service_rfga4ug'
export const EMAILJS_CAREERS_LUCY_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_CAREERS_LUCY_PUBLIC_KEY || '9fjvy6g6-1Zk9_pqK'

// Commercial CTA Email Configuration:
// Using Lucy's EmailJS account - email sent to lucy@margav.energy with CC to sales@margav.energy
// Configure the EmailJS template to:
// - "To Email": lucy@margav.energy
// - "CC Email": sales@margav.energy
export const EMAILJS_COMMERCIAL_LUCY_SERVICE_ID = import.meta.env.VITE_EMAILJS_COMMERCIAL_LUCY_SERVICE_ID || 'service_rfga4ug'
export const EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_COMMERCIAL_LUCY_TEMPLATE_ID || 'template_c5aeqg3'
export const EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_COMMERCIAL_LUCY_PUBLIC_KEY || '9fjvy6g6-1Zk9_pqK'

// Template variables available:
// {{name}}, {{company_name}}, {{email}}, {{telephone}}, {{preferred_time}}, {{timestamp}}, {{source}}, {{cc_email}}

