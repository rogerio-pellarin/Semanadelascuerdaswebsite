import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'event';
  structuredData?: any;
}

export default function SEO({ 
  title, 
  description, 
  keywords = '',
  image = 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&h=630&fit=crop',
  type = 'website',
  structuredData
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://semanadelascuerdas.com';
  const url = `${baseUrl}${location.pathname}`;
  const fullTitle = `${title} | Semana de las Cuerdas`;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Remove any existing meta tags we'll be setting
    const metaTags = [
      'description',
      'keywords',
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type',
      'og:site_name',
      'og:locale',
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image',
      'twitter:site'
    ];

    metaTags.forEach(name => {
      const existing = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (existing) existing.remove();
    });

    // Set meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = description;
    document.head.appendChild(metaDescription);

    // Set meta keywords
    if (keywords) {
      const metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = keywords;
      document.head.appendChild(metaKeywords);
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Semana de las Cuerdas' },
      { property: 'og:locale', content: 'es_ES' },
      { property: 'og:locale:alternate', content: 'en_US' },
      { property: 'og:locale:alternate', content: 'pt_BR' }
    ];

    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:site', content: '@Vivat-Musica' }
    ];

    twitterTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup on unmount
    return () => {
      metaTags.forEach(name => {
        const existing = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        if (existing) existing.remove();
      });
    };
  }, [title, description, keywords, image, url, type, structuredData, fullTitle]);

  return null;
}

// Helper function to generate event structured data
export function getEventStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": "Semana de las Cuerdas",
    "description": "Festival de formación musical de élite con clases individuales y maestros internacionales para jóvenes músicos de cuerdas y piano",
    "startDate": "2026-10-05",
    "endDate": "2026-10-10",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Medellín, Colombia",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Medellín",
        "addressCountry": "CO"
      }
    },
    "image": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&h=630&fit=crop",
    "organizer": {
      "@type": "Organization",
      "name": "Semana de las Cuerdas",
      "url": "https://semanadelascuerdas.com"
    },
    "performer": {
      "@type": "MusicGroup",
      "name": "Maestros Internacionales"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://semanadelascuerdas.com/audiciona",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-09-05"
    }
  };
}

// Helper function to generate organization structured data
export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Semana de las Cuerdas",
    "url": "https://semanadelascuerdas.com",
    "logo": "https://semanadelascuerdas.com/logo.png",
    "description": "Festival de formación musical de élite para jóvenes talentos de cuerdas y piano",
    "sameAs": [
      "https://www.instagram.com/semanadelascuerdasmed/",
      "https://www.facebook.com/semanadelascuerdas",
      "https://www.youtube.com/@semanadelascuerdas"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "General Inquiries",
      "email": "info@semanadelascuerdas.com"
    }
  };
}

// Helper function to generate breadcrumb structured data
export function getBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://semanadelascuerdas.com${item.url}`
    }))
  };
}