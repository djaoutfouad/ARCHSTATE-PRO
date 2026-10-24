/**
 * ArchEstate Pro - Central SEO Metadata Source of Truth
 * Strict guidelines:
 * - <title> length MUST be between 45 and 55 characters (inclusive)
 * - <meta name="description"> length MUST be between 130 and 155 characters (inclusive)
 * - Canonical & og:url MUST use https://archstate-pro.pages.dev ending with trailing slash (/)
 * - No <meta name="keywords"> tags
 */

export interface RouteSeoItem {
  path: string;
  title: string;
  description: string;
}

export const ALL_ROUTE_SEO: Record<string, RouteSeoItem> = {
  // 1. Home
  '/': {
    path: '/',
    title: 'ArchEstate Pro — Building & Real Estate Calculators',
    description: 'Accurate construction, false ceiling, and real estate calculators. Estimate drywall, concrete, masonry, paint, and mortgage finances on ArchEstate Pro.',
  },

  // 2. Governance & Legal Pages
  '/about/': {
    path: '/about/',
    title: 'About ArchEstate Pro — Construction Estimating Suite',
    description: 'Learn about ArchEstate Pro, our client-side architectural formulas, construction material estimators, and professional real estate financial tool suite.',
  },
  '/contact/': {
    path: '/contact/',
    title: 'Contact ArchEstate Pro — Technical & Support Desk',
    description: 'Contact ArchEstate Pro engineering desk for mathematical formula questions, architectural tool feedback, partnerships, and technical support inquiries.',
  },
  '/privacy/': {
    path: '/privacy/',
    title: 'ArchEstate Pro Privacy Policy & Data Security Guide',
    description: 'Read the ArchEstate Pro privacy policy. Learn how our client-side calculations protect user confidentiality without remote database tracking or accounts.',
  },
  '/terms/': {
    path: '/terms/',
    title: 'ArchEstate Pro Terms of Service & Legal Disclaimers',
    description: 'Read the ArchEstate Pro terms of service, mathematical planning limitations, calculation assumptions, liability disclaimers, and user guidance standards.',
  },
  '/methodology/': {
    path: '/methodology/',
    title: 'ArchEstate Pro Calculation Methodology & Formulas',
    description: 'Review our rigorous calculation methodology, material wastage allowances, structural geometry formulas, and standard real estate underwriting methods.',
  },

  // 3. Category Pages
  '/calculators/false-ceilings-drywall/': {
    path: '/calculators/false-ceilings-drywall/',
    title: 'False Ceiling & Drywall Calculators — ArchEstate Pro',
    description: 'Estimate materials for gypsum BA13, PVC panels, T24 acoustic grids, cove lights, and plaster staff with free false ceiling tools on ArchEstate Pro.',
  },
  '/calculators/construction-finishing/': {
    path: '/calculators/construction-finishing/',
    title: 'Construction & Finishes Calculators — ArchEstate Pro',
    description: 'Calculate concrete volumes, brick masonry, tile patterns, architectural paint coverage, and HVAC cooling sizing with construction tools on ArchEstate Pro.',
  },
  '/calculators/real-estate-financial/': {
    path: '/calculators/real-estate-financial/',
    title: 'Real Estate & Mortgage Calculators — ArchEstate Pro',
    description: 'Analyze fixed-rate mortgages, net rental yields, capitalization rates, home affordability ratios, and buyer closing costs with tools on ArchEstate Pro.',
  },

  // 4. 15 Specific Calculators
  '/calculators/ba13-drywall-ceiling/': {
    path: '/calculators/ba13-drywall-ceiling/',
    title: 'BA13 Drywall Ceiling Calculator — ArchEstate Pro',
    description: 'Calculate BA13 drywall gypsum boards, primary CD channels, perimeter tracks, suspension hangers, and joint compound for ceilings on ArchEstate Pro.',
  },
  '/calculators/pvc-panel-ceiling/': {
    path: '/calculators/pvc-panel-ceiling/',
    title: 'PVC Panel Ceiling Calculator — ArchEstate Pro App',
    description: 'Estimate PVC ceiling panels, perimeter U-channels, intermediate furring, and fasteners with waste allowances for wet area false ceilings on ArchEstate Pro.',
  },
  '/calculators/acoustic-grid-ceiling/': {
    path: '/calculators/acoustic-grid-ceiling/',
    title: 'Acoustic Grid Ceiling Calculator — ArchEstate Pro',
    description: 'Calculate 60x60 cm acoustic ceiling tiles, T24 main runners, cross tees, wall angles, and hanger wires for commercial grid drop ceilings on ArchEstate Pro.',
  },
  '/calculators/cove-ceiling/': {
    path: '/calculators/cove-ceiling/',
    title: 'Cove Light Ceiling Calculator — ArchEstate Pro App',
    description: 'Calculate gypsum boards, vertical light drops, LED cove perimeters, framing channels, and corner beads for recessed ceiling designs on ArchEstate Pro.',
  },
  '/calculators/plaster-staff-ceiling/': {
    path: '/calculators/plaster-staff-ceiling/',
    title: 'Plaster Staff Ceiling Calculator — ArchEstate Pro',
    description: 'Estimate molding plaster bags, sisal fiber reinforcement, brass wire ties, and perimeter cornice lengths for traditional staff ceilings on ArchEstate Pro.',
  },
  '/calculators/paint-primer/': {
    path: '/calculators/paint-primer/',
    title: 'Paint & Primer Coverage Calculator — ArchEstate Pro',
    description: 'Calculate interior wall and ceiling paint liters, primer cans, multi-coat coverage, and waste allowances for architectural painting on ArchEstate Pro.',
  },
  '/calculators/tiles-estimator/': {
    path: '/calculators/tiles-estimator/',
    title: 'Floor & Wall Tile Estimator — ArchEstate Pro Suite',
    description: 'Estimate floor and wall ceramic tile counts, square meters, mortar boxes, and grout bags with customizable gap spacing and wastage on ArchEstate Pro.',
  },
  '/calculators/concrete-volume/': {
    path: '/calculators/concrete-volume/',
    title: 'Concrete Volume & Mix Calculator — ArchEstate Pro',
    description: 'Calculate cubic meters of concrete, Portland cement bags, sand tonnes, gravel aggregate, and water for slabs, footings, and beams on ArchEstate Pro.',
  },
  '/calculators/bricks-blocks/': {
    path: '/calculators/bricks-blocks/',
    title: 'Brick & Block Wall Calculator — ArchEstate Pro App',
    description: 'Calculate standard clay bricks, concrete masonry blocks (CMU), mortar sand volumes, and cement bags with joint thickness wastage on ArchEstate Pro.',
  },
  '/calculators/ac-btu-size/': {
    path: '/calculators/ac-btu-size/',
    title: 'AC BTU Sizing Cooling Calculator — ArchEstate Pro',
    description: 'Calculate room cooling BTU requirements, tonnage ratings, and recommended inverter air conditioner sizing for climate comfort on ArchEstate Pro.',
  },
  '/calculators/mortgage-piti/': {
    path: '/calculators/mortgage-piti/',
    title: 'Mortgage PITI Amortization Calc — ArchEstate Pro',
    description: 'Calculate monthly fixed-rate mortgage payments including principal, interest, property tax, homeowners insurance, and HOA dues on ArchEstate Pro.',
  },
  '/calculators/rental-yield/': {
    path: '/calculators/rental-yield/',
    title: 'Rental Yield & Cap Rate Calculator — ArchEstate Pro',
    description: 'Calculate gross rental yield, net annual yield, and property capitalization rate (Cap Rate) after operating expenses and vacancy on ArchEstate Pro.',
  },
  '/calculators/affordability-calc/': {
    path: '/calculators/affordability-calc/',
    title: 'Home Affordability Calculator — ArchEstate Pro Tool',
    description: 'Determine maximum home purchase price and loan borrowing capacity based on monthly income, debts, down payment, and DTI limits on ArchEstate Pro.',
  },
  '/calculators/closing-costs/': {
    path: '/calculators/closing-costs/',
    title: 'Closing Costs Calculator — ArchEstate Pro Finance',
    description: 'Estimate buyer closing expenses, lender origination fees, appraisal, title insurance, recording taxes, and prepaid escrow reserves on ArchEstate Pro.',
  },
  '/calculators/wallpaper-roll/': {
    path: '/calculators/wallpaper-roll/',
    title: 'Wallpaper Roll Quantity Calculator — ArchEstate Pro',
    description: 'Calculate standard wallpaper rolls needed with pattern repeat matching, drop wastage allowance, and window or door subtractions on ArchEstate Pro.',
  },

  // 5. 404 Fallback
  '/404/': {
    path: '/404/',
    title: '404 Page Not Found Error — ArchEstate Pro Suite',
    description: 'The requested page or calculator could not be found on ArchEstate Pro. Browse our 15 architectural and real estate calculation suites online.',
  },
};

/**
 * Resolve standardized SEO metadata for any pathname.
 */
export function getRouteSeo(rawPath: string): RouteSeoItem {
  let clean = (rawPath || '/').split('?')[0].split('#')[0].trim();
  if (clean === '' || clean === '/index.html') clean = '/';
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (!clean.endsWith('/')) clean = `${clean}/`;
  if (clean === '/404.html/') clean = '/404/';

  return ALL_ROUTE_SEO[clean] || ALL_ROUTE_SEO['/404/'] || ALL_ROUTE_SEO['/'];
}
