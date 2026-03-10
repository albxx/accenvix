// Google Analytics 4 setup script
// This file contains the GA4 configuration that was previously inline in index.html

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

// Initialize GA4 with the measurement ID
gtag('js', new Date());

// Get measurement ID from environment variable or use default
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-RL6X7CRTJK';
gtag('config', GA_MEASUREMENT_ID);

export { gtag, GA_MEASUREMENT_ID };