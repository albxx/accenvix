/**
 * Google Analytics 4 Configuration
 * 
 * To configure:
 * 1. Get your Measurement ID from Google Analytics (format: G-XXXXXXXXXX)
 * 2. Replace the placeholder below with your actual Measurement ID
 * 3. Or set VITE_GA_MEASUREMENT_ID environment variable
 */

// Default Measurement ID - matches the GA4 ID in index.html
const DEFAULT_MEASUREMENT_ID = 'G-RL6X7CRTJK';

// Get Measurement ID from environment variable or use default
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID;

/**
 * Initialize Google Analytics
 * This should be called once when the app loads
 * Note: If GA script is already loaded in index.html, this ensures gtag is available
 */
export const initGA = () => {
  // GA is configured via index.html, ensure gtag is available
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    // Ensure gtag function exists
    if (!window.gtag) {
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };
    }
  }
  // Removed console.log for production
};

/**
 * Track a page view
 * @param path - The page path to track
 * @param title - The page title (optional)
 */
export const trackPageView = (path: string, title?: string) => {
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    // Removed console.log for production - placeholder detection only
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
};

/**
 * Track custom events
 * @param eventName - The name of the event
 * @param eventParams - Additional event parameters
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    // Removed console.log for production - placeholder detection only
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// TypeScript declarations for window.gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'js' | 'event',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

export {};