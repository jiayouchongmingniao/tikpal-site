// Shared i18n helpers for the multi-language homepage and /room pages.

export const LANGS = ['en', 'zh', 'ja', 'ko', 'de', 'es', 'it'] as const;
export type Lang = (typeof LANGS)[number];

// Non-English homepage routes live at /{lang}/ — English stays at /.
export const HOME_LANGS = LANGS.filter((l) => l !== 'en');

export function homePath(lang: string): string {
  return lang === 'en' ? '/' : `/${lang}/`;
}

// Top-level SEO landing slugs: localized as /{slug}/{lang}/ (like /voice/).
export const LANDING_SLUGS = [
  'voice',
  'ai-note-taker',
  'ai-memory',
  'voice-recorder-for-ideas',
  'voice-to-task',
  'voice-to-email',
  'voice-to-calendar',
  'plaud-alternative',
] as const;

// Localized label for the breadcrumb root per language.
export const HOME_LABELS: Record<string, string> = {
  en: 'Home',
  zh: '首页',
  ja: 'ホーム',
  ko: '홈',
  de: 'Startseite',
  es: 'Inicio',
  it: 'Home',
};

// Path of a localized page area for `lang`:
// - 'home': / and /{lang}/
// - 'room': /room/{lang}/
// - 'app': /app/{lang}/
// - landing slugs ('voice', 'ai-note-taker', ...): /{slug}/{lang}/
// - 'compare/*' and 'use-cases/*': /{kind}/{lang}/
// - any other slug ('privacy', 'terms', 'about', ...): /{slug}/ and /{lang}/{slug}/
export function pagePath(kind: string, lang: string): string {
  if (kind === 'home') return homePath(lang);
  if (kind === 'room') return `/room/${lang}/`;
  if (kind === 'app') return `/app/${lang}/`;
  if ((LANDING_SLUGS as readonly string[]).includes(kind)) return `/${kind}/${lang}/`;
  if (kind.startsWith('compare/')) return `/compare/${kind.slice('compare/'.length)}/${lang}/`;
  if (kind.startsWith('use-cases/'))
    return `/use-cases/${kind.slice('use-cases/'.length)}/${lang}/`;
  return lang === 'en' ? `/${kind}/` : `/${lang}/${kind}/`;
}

// Rewrite one href for the active language:
// - external URLs, mailto/tel and bare anchors stay untouched
// - /room* and /app* routes point at the localized /room/{lang}/ and
//   /app/{lang}/ pages (never the bare /room/ or /app/ browser-language
//   detection entries, so in-site navigation keeps the language the user
//   is currently reading)
// - other internal paths get the /{lang} prefix (en keeps /)
export function localizeHref(href: string, lang: string): string {
  if (!href || href === '#') return href;
  if (href.startsWith('#')) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  if (href.startsWith('/room')) return `/room/${lang}/`;
  if (href.startsWith('/app')) return `/app/${lang}/`;
  if (href.startsWith('/compare/')) return `${href}${lang}/`;
  if (href.startsWith('/use-cases/')) return `${href}${lang}/`;
  const landing = href.match(
    /^\/(voice|ai-note-taker|ai-memory|voice-recorder-for-ideas|voice-to-task|voice-to-email|voice-to-calendar|plaud-alternative)(\/|$)/,
  );
  if (landing) return `/${landing[1]}/${lang}/`;
  if (href.startsWith('/')) return lang === 'en' ? href : `/${lang}${href}`;
  return href;
}

// Deep-walk a content object, rewriting every `href` value for `lang`.
export function localizeContent<T>(value: T, lang: string): T {
  if (Array.isArray(value)) {
    return value.map((item) => localizeContent(item, lang)) as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      out[key] =
        key === 'href' && typeof val === 'string'
          ? localizeHref(val, lang)
          : localizeContent(val, lang);
    }
    return out as T;
  }
  return value;
}
