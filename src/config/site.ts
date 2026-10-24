import { ALL_ROUTE_SEO, getRouteSeo, RouteSeoItem } from './seoMetadata';

export { ALL_ROUTE_SEO, getRouteSeo };
export type { RouteSeoItem };

const DEFAULT_SITE_URL = 'https://archstate-pro.pages.dev';

const rawSiteUrl = (
  (typeof process !== 'undefined' && (process.env?.VITE_SITE_URL || process.env?.SITE_URL))
    ? (process.env.VITE_SITE_URL || process.env.SITE_URL)!
    : (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL)
      ? (import.meta as unknown as { env?: { VITE_SITE_URL?: string } }).env!.VITE_SITE_URL!
      : DEFAULT_SITE_URL
).trim().replace(/\/+$/, '');

// Use the current active Cloudflare Pages domain https://archstate-pro.pages.dev
export const SITE_URL = (rawSiteUrl.includes('archestatepro.com') || rawSiteUrl.includes('workers.dev') || rawSiteUrl.includes('localhost') || !rawSiteUrl)
  ? DEFAULT_SITE_URL
  : rawSiteUrl;

export const SITE_NAME = 'ArchEstate Pro';
export const SITE_TAGLINE = 'Building & Real Estate Calculators';
export const SITE_DESCRIPTION = 'Accurate construction, false ceiling, and real estate calculators. Estimate drywall, concrete, masonry, paint, and mortgage finances on ArchEstate Pro.';
export const CONTACT_EMAIL = 'contact15archestate@gmail.com';

// Category route mapping - all ending with trailing slash (/)
export const CATEGORY_ROUTES: Record<string, string> = {
  'ceilings': '/calculators/false-ceilings-drywall/',
  'construction': '/calculators/construction-finishing/',
  'real-estate': '/calculators/real-estate-financial/',
};

// Reverse mapping from route slug to category ID
export const ROUTE_TO_CATEGORY_ID: Record<string, string> = {
  'false-ceilings-drywall': 'ceilings',
  'construction-finishing': 'construction',
  'real-estate-financial': 'real-estate',
};

export const LEGAL_ROUTES = [
  { path: '/about/', type: 'about', title: 'About ArchEstate Pro' },
  { path: '/contact/', type: 'contact', title: 'Contact ArchEstate Pro' },
  { path: '/privacy/', type: 'privacy', title: 'Privacy Policy' },
  { path: '/terms/', type: 'terms', title: 'Terms of Service' },
  { path: '/methodology/', type: 'methodology', title: 'Calculation Methodology' },
] as const;

export const VALID_CALCULATOR_SLUGS = [
  'ba13-drywall-ceiling',
  'pvc-panel-ceiling',
  'acoustic-grid-ceiling',
  'cove-ceiling',
  'plaster-staff-ceiling',
  'paint-primer',
  'tiles-estimator',
  'concrete-volume',
  'bricks-blocks',
  'ac-btu-size',
  'mortgage-piti',
  'rental-yield',
  'affordability-calc',
  'closing-costs',
  'wallpaper-roll',
] as const;

export const ALL_CANONICAL_ROUTES: readonly string[] = [
  '/',
  ...LEGAL_ROUTES.map(r => r.path),
  ...Object.values(CATEGORY_ROUTES),
  ...VALID_CALCULATOR_SLUGS.map(s => `/calculators/${s}/`),
] as const;

export type CalculatorSlug = typeof VALID_CALCULATOR_SLUGS[number];

export const isValidCalculatorSlug = (slug: string): slug is CalculatorSlug => {
  const cleanSlug = slug.replace(/\/+$/, '');
  return (VALID_CALCULATOR_SLUGS as readonly string[]).includes(cleanSlug);
};

export const getCanonicalUrl = (pathname: string): string => {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (cleanPath === '/' || cleanPath === '') {
    return `${SITE_URL}/`;
  }
  // Standardize: always ending with trailing slash (/)
  const stripped = cleanPath.replace(/\/+$/, '');
  return `${SITE_URL}${stripped}/`;
};

export const getCalculatorPath = (slug: string): string => {
  const cleanSlug = slug.replace(/\/+$/, '');
  return `/calculators/${cleanSlug}/`;
};

export const getCategoryPath = (categoryId: string): string => {
  const target = CATEGORY_ROUTES[categoryId] || `/calculators/${categoryId}/`;
  return target.endsWith('/') ? target : `${target}/`;
};
