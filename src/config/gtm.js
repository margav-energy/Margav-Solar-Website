// Google Tag Manager Configuration
export const GTM_ID = 'GTM-PHHLB637';

// Initialize GTM dataLayer
export const initDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
};

// Push events to dataLayer
export const pushToDataLayer = (data) => {
  if (window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Track page views for React Router
export const trackPageView = (url) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: url,
    page_title: document.title
  });
};
