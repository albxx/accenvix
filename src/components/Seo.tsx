import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  schema?: object;
}

const DEFAULT_OG_IMAGE = '/android-chrome-512x512.png';
const BASE_URL = 'https://accenvix.com';

// LocalBusiness Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Accenvix Solutions",
  "description": "Professional training, business consulting, and digital transformation services in Malaysia",
  "url": BASE_URL,
  "telephone": "+60 13 991 5339",
  "email": "hello@accenvix.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11-02 Imperia, No 1 Jalan Laksamana",
    "addressLocality": "Iskandar Puteri",
    "addressRegion": "Johor",
    "postalCode": "79000",
    "addressCountry": "MY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "1.467",
    "longitude": "103.641"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "Country",
    "name": "Malaysia"
  },
  "sameAs": [
    "https://www.facebook.com/accenvix",
    "https://www.linkedin.com/company/accenvix",
    "https://www.instagram.com/accenvix"
  ]
};

// Services Schema
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Professional Training",
        "description": "Corporate training programs for workforce development"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Business Consulting",
        "description": "Strategic business consulting for growth and optimization"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Digital Transformation",
        "description": "Modern digital solutions for business modernization"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Software Development",
        "description": "Custom software and web application development"
      }
    }
  ]
};

export function useSEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical,
  schema,
}: SEOProps) {
  useEffect(() => {
    // Set page title
    document.title = `${title} | Accenvix Solutions`;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', description);
    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // Open Graph tags
    updateMeta('og:title', ogTitle || title, true);
    updateMeta('og:description', ogDescription || description, true);
    updateMeta('og:image', ogImage || DEFAULT_OG_IMAGE, true);
    updateMeta('og:url', ogUrl || window.location.href, true);
    updateMeta('og:type', 'website', true);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', ogTitle || title);
    updateMeta('twitter:description', ogDescription || description);
    updateMeta('twitter:image', ogImage || DEFAULT_OG_IMAGE);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`);
    }

    // JSON-LD Structured Data
    // Remove existing schema scripts
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    // Add LocalBusiness schema (always present)
    const localBusinessScript = document.createElement('script');
    localBusinessScript.type = 'application/ld+json';
    localBusinessScript.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(localBusinessScript);

    // Add Services schema (always present)
    const servicesScript = document.createElement('script');
    servicesScript.type = 'application/ld+json';
    servicesScript.textContent = JSON.stringify(servicesSchema);
    document.head.appendChild(servicesScript);

    // Add custom schema if provided
    if (schema) {
      const customScript = document.createElement('script');
      customScript.type = 'application/ld+json';
      customScript.textContent = JSON.stringify(schema);
      document.head.appendChild(customScript);
    }

    // Cleanup on unmount
    return () => {
      document.title = 'Accenvix Solutions | Professional Training, Business Consulting & Digital Transformation';
      // Clean up schema scripts on unmount
      const schemas = document.querySelectorAll('script[type="application/ld+json"]');
      schemas.forEach(script => script.remove());
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical, schema]);
}
