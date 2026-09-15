// Sitemap endpoint with hreflang alternate annotations.
// MAINTENANCE: page groups below are hardcoded — when adding a new page or
// language, update the GROUPS list and keep the alternates in sync with the
// hreflang <link> tags each page renders via BaseLayout.
import type { APIRoute } from 'astro';
import { LANGS } from '../utils/i18n';

const ORIGIN = 'https://www.tikpal.ai';

// One group = one localized page family; all members are alternates of each other.
const GROUPS: { path: (lang: string) => string; xDefault: string }[] = [
  { path: (l) => (l === 'en' ? '/' : `/${l}/`), xDefault: '/' },
  { path: (l) => `/room/${l}/`, xDefault: '/room/en/' },
  { path: (l) => `/intelligence/${l}/`, xDefault: '/intelligence/en/' },
  { path: (l) => `/app/${l}/`, xDefault: '/app/en/' },
  { path: (l) => `/voice/${l}/`, xDefault: '/voice/en/' },
  { path: (l) => `/compare/tikpal-vs-plaud/${l}/`, xDefault: '/compare/tikpal-vs-plaud/en/' },
  { path: (l) => `/compare/ai-voice-recorders/${l}/`, xDefault: '/compare/ai-voice-recorders/en/' },
  { path: (l) => `/use-cases/creators/${l}/`, xDefault: '/use-cases/creators/en/' },
  ...[
    'ai-note-taker',
    'ai-memory',
    'voice-recorder-for-ideas',
    'voice-to-task',
    'voice-to-email',
    'voice-to-calendar',
    'plaud-alternative',
  ].map((slug) => ({
    path: (l: string) => `/${slug}/${l}/`,
    xDefault: `/${slug}/en/`,
  })),
  ...['faq', 'about', 'support', 'privacy', 'terms'].map((slug) => ({
    path: (l: string) => (l === 'en' ? `/${slug}/` : `/${l}/${slug}/`),
    xDefault: `/${slug}/`,
  })),
];

const esc = (s: string) => s.replace(/&/g, '&amp;');

export const GET: APIRoute = () => {
  const urls: string[] = [];
  for (const group of GROUPS) {
    const alternates = [
      ...LANGS.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${group.path(l)}"/>`
      ),
      `<xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${group.xDefault}"/>`,
    ].join('\n    ');
    for (const lang of LANGS) {
      urls.push(`  <url>\n    <loc>${esc(ORIGIN + group.path(lang))}</loc>\n    ${alternates}\n  </url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
