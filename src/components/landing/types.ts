// Content shape shared by all SEO landing pages (voice, ai-note-taker,
// ai-memory, voice-to-*, plaud-alternative, compare/*, use-cases/*).
// Every field is localized in 7 languages.

export interface LandingCta {
  label: string;
  href: string;
}

export interface LandingHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: LandingCta;
  trustLine?: string;
}

export interface LandingCrumb {
  label: string;
  // Only linkable ancestors carry href (e.g. "/voice/" → localized by route).
  href?: string;
}

export interface FlowSection {
  kind: 'flow';
  title: string;
  intro?: string;
  from: string;
  steps: string[];
}

export interface TableSection {
  kind: 'table';
  title: string;
  intro?: string;
  cols: string[];
  rows: { label: string; values: string[] }[];
}

export interface ChipsSection {
  kind: 'chips';
  title: string;
  intro?: string;
  chips: string[];
  note?: string;
}

export interface PointsSection {
  kind: 'points';
  title: string;
  intro?: string;
  points: string[];
}

export interface SpecCardsSection {
  kind: 'specCards';
  title: string;
  intro?: string;
  cards: { name: string; line: string }[];
}

export interface QuoteSection {
  kind: 'quote';
  title: string;
  quote: string;
  result: string;
  note?: string;
}

export interface ScenesSection {
  kind: 'scenes';
  title: string;
  intro?: string;
  items: { name: string; body: string }[];
}

export type LandingSection =
  | FlowSection
  | TableSection
  | ChipsSection
  | PointsSection
  | SpecCardsSection
  | QuoteSection
  | ScenesSection;

export interface LandingFaq {
  title: string;
  items: { q: string; a: string }[];
}

export interface LandingFinalCta {
  title: string;
  button: LandingCta;
  // Optional "Learn more about Tikpal Voice →" link (pages other than /voice).
  learnMore?: LandingCta;
}

export interface LandingMeta {
  title: string;
  description: string;
}

export interface LandingPageContent {
  meta: LandingMeta;
  // Trail after "Home"; the last item is the current page (never linked).
  crumbs: LandingCrumb[];
  hero: LandingHero;
  sections: LandingSection[];
  faq?: LandingFaq;
  finalCta: LandingFinalCta;
}
