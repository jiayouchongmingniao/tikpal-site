// JSON-LD structured data builders shared across pages.
import type { HomeContent } from '../components/home/types';

export const SITE_ORIGIN = 'https://www.tikpal.ai';
export const SHOP_URL =
  'https://shop.tikpal.ai/?utm_source=tikpal_site&utm_medium=web&utm_campaign=homepage';

const SOCIAL_PROFILES = [
  'https://www.tiktok.com/@tikpal_ai',
  'https://www.youtube.com/@Tikpal-Ai',
  'https://www.facebook.com/profile.php?id=61583482054366',
  'https://x.com/Spatial_Therapy',
  'https://www.instagram.com/power0fmoney2025/',
  'https://discord.com/invite/kjSvmChTWn',
];

export function faqJsonLd(items: { q: string; a: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

// One canonical product identity across the site: "Tikpal Voice", $129 USD.
// Keep in sync with the Shopify listing (name/price/currency must match).
export function productJsonLd(description: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Tikpal Voice',
    image: `${SITE_ORIGIN}/images/buy-product.webp`,
    description,
    brand: { '@type': 'Brand', name: 'Tikpal' },
    offers: {
      '@type': 'Offer',
      url: SHOP_URL,
      priceCurrency: 'USD',
      price: '129',
      availability: 'https://schema.org/InStock',
    },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
    },
  };
}

export function organizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tikpal',
    legalName: 'Spatial Therapy Inc.',
    url: SITE_ORIGIN,
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tikpal',
    url: SITE_ORIGIN,
  };
}

// BreadcrumbList from a trail of {name, url} items (root first).
export function breadcrumbJsonLd(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function homeJsonLd(home: HomeContent): object[] {
  return [
    faqJsonLd(home.homeFaq.items),
    productJsonLd(home.meta.description),
    organizationJsonLd(),
    websiteJsonLd(),
  ];
}
