import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView, GA_MEASUREMENT_ID } from '@/lib/analytics';

/**
 * Custom hook for Google Analytics page view tracking
 * 
 * Usage:
 * import { useAnalytics } from '@/hooks/useAnalytics';
 * 
 * function App() {
 *   useAnalytics();
 *   // ... rest of app
 * }
 */
export const useAnalytics = () => {
  const location = useLocation();

  // Initialize GA on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const path = location.pathname + location.search;
    trackPageView(path, document.title);
  }, [location]);
};

/**
 * Track custom events outside of React components
 * 
 * Usage:
 * import { trackCustomEvent } from '@/hooks/useAnalytics';
 * 
 * // Track button click
 * trackCustomEvent('button_click', { button_name: 'contact_submit' });
 */
export const trackCustomEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  // Check for placeholder IDs
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX' || GA_MEASUREMENT_ID === 'G-MEASUREMENT_ID') {
    console.log('Google Analytics [Placeholder]: Custom Event:', eventName, eventParams);
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export {};