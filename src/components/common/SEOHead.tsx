import React, { useEffect } from 'react';
import { CalculatorDefinition, CategoryInfo } from '../../types/calculator';
import { 
  SITE_URL, 
  SITE_NAME, 
  SITE_TAGLINE, 
  SITE_DESCRIPTION, 
  CONTACT_EMAIL, 
  getCanonicalUrl, 
  getCalculatorPath, 
  getCategoryPath,
  getRouteSeo
} from '../../config/site';

interface SEOHeadProps {
  calculator?: CalculatorDefinition | null;
  category?: CategoryInfo | null;
  legalType?: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology' | null;
  pathname?: string;
  is404?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ 
  calculator, 
  category, 
  legalType, 
  pathname = '/',
  is404 = false,
}) => {
  // Determine title, description, and canonical
  let pageTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;
  let metaDesc = SITE_DESCRIPTION;
  let canonicalUrl = getCanonicalUrl(pathname);

  if (is404) {
    const seo = getRouteSeo('/404/');
    pageTitle = seo.title;
    metaDesc = seo.description;
    canonicalUrl = getCanonicalUrl(pathname);
  } else if (calculator) {
    const path = getCalculatorPath(calculator.slug);
    const seo = getRouteSeo(path);
    pageTitle = seo.title;
    metaDesc = seo.description;
    canonicalUrl = getCanonicalUrl(path);
  } else if (category) {
    const path = getCategoryPath(category.id);
    const seo = getRouteSeo(path);
    pageTitle = seo.title;
    metaDesc = seo.description;
    canonicalUrl = getCanonicalUrl(path);
  } else if (legalType) {
    const seo = getRouteSeo(`/${legalType}/`);
    pageTitle = seo.title;
    metaDesc = seo.description;
    canonicalUrl = getCanonicalUrl(`/${legalType}/`);
  } else if (pathname) {
    const seo = getRouteSeo(pathname);
    pageTitle = seo.title;
    metaDesc = seo.description;
    canonicalUrl = getCanonicalUrl(pathname);
  }

  // Client-side DOM update for SPA transitions
  useEffect(() => {
    document.title = pageTitle;
    
    // Update description
    let descElem = document.querySelector('meta[name="description"]');
    if (!descElem) {
      descElem = document.createElement('meta');
      descElem.setAttribute('name', 'description');
      document.head.appendChild(descElem);
    }
    descElem.setAttribute('content', metaDesc);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Remove keywords tag if present
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.remove();
    }

    // Robots meta tag handling
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (is404) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, follow');
    } else if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large');
    }

    // OpenGraph
    const updateMeta = (attr: string, val: string, content: string) => {
      let elem = document.querySelector(`meta[${attr}="${val}"]`);
      if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute(attr, val);
        document.head.appendChild(elem);
      }
      elem.setAttribute('content', content);
    };

    updateMeta('property', 'og:title', pageTitle);
    updateMeta('property', 'og:description', metaDesc);
    updateMeta('property', 'og:url', canonicalUrl);
    updateMeta('property', 'og:site_name', SITE_NAME);
    updateMeta('name', 'twitter:title', pageTitle);
    updateMeta('name', 'twitter:description', metaDesc);
  }, [pageTitle, metaDesc, canonicalUrl, is404]);

  // Generate JSON-LD SoftwareApplication / WebApplication Schema
  const webAppSchema = !is404 ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': calculator ? `${calculator.title} | ${SITE_NAME}` : `${SITE_NAME} Computational Suite`,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'url': canonicalUrl,
    'description': metaDesc,
    'isAccessibleForFree': true,
    'author': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'email': CONTACT_EMAIL,
      'url': SITE_URL,
    },
  } : null;

  // BreadcrumbList Schema for SEO crawlability
  const breadcrumbSchema = calculator ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': SITE_NAME,
        'item': `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': calculator.categoryName,
        'item': getCanonicalUrl(getCategoryPath(calculator.category)),
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': calculator.title,
        'item': canonicalUrl,
      },
    ],
  } : category ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': SITE_NAME,
        'item': `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': category.name,
        'item': canonicalUrl,
      },
    ],
  } : null;

  const faqSchema = calculator && calculator.faqs && calculator.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': calculator.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  } : null;

  return (
    <>
      {webAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};
