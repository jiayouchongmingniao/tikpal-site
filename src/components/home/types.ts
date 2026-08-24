// Shared content shapes for the multi-language homepage and site chrome.
// Every src/content/home/i18n/{lang}.json and src/content/common/i18n/{lang}.json
// file follows these schemas exactly.

export interface Cta {
  label: string;
  href: string;
}

// ---------- homepage sections ----------

export interface HomeMeta {
  title: string;
  description: string;
}

export interface HomeHero {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  seoLine: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  exploreLink: Cta;
  trustLine: string;
}

export interface BrandProduct {
  name: string;
  verb: string;
  line: string;
}

export interface Brand {
  eyebrow: string;
  title: string;
  subtitle: string;
  products: BrandProduct[];
  exploreCta: Cta;
}

export interface DemoOutput {
  kind: string;
  text: string;
}

export interface HomeDemo {
  eyebrow: string;
  title: string;
  deviceCaption: string;
  quoteLabel: string;
  quote: string;
  resultsLabel: string;
  outputs: DemoOutput[];
  flowLine: string;
}

export interface WhyNotPhone {
  title: string;
  title2: string;
  phoneLabel: string;
  phoneSteps: string[];
  tikpalLabel: string;
  tikpalLine: string;
  closing: string;
}

export interface ChainLink {
  label: string;
  text: string;
}

export interface TaskCard {
  name: string;
  quote: string;
  result: string;
}

export interface TasksSection {
  title: string;
  title2: string;
  noteLine: string;
  noteLink: Cta;
  cards: TaskCard[];
  customLine: string;
}

export interface IntegrationAction {
  quote: string;
  target: string;
}

export interface Integrations {
  title: string;
  title2: string;
  actions: IntegrationAction[];
  proof: string;
}

export interface Recall {
  title: string;
  title2: string;
  leftLabel: string;
  filesLabel: string;
  files: string[];
  rightLabel: string;
  query: string;
  resultLabel: string;
  tags: string[];
  closing: string;
  memoryLink: Cta;
}

export interface Focus {
  eyebrow: string;
  title: string;
  modes: string[];
  line: string;
}

export interface TrustPoint {
  name: string;
  body: string;
}

export interface Trust {
  title: string;
  subtitle: string;
  points: TrustPoint[];
  footnote: string;
}

export interface HomeFaqItem {
  q: string;
  a: string;
}

export interface HomeFaq {
  title: string;
  items: HomeFaqItem[];
  moreLink: NavLink;
}

export interface HardwarePoint {
  name: string;
}

export interface HardwareSpec {
  name: string;
  value: string;
}

export interface Hardware {
  title: string;
  subtitle: string;
  points: HardwarePoint[];
  specsToggle: string;
  specs: HardwareSpec[];
}

export interface FinalCta {
  title: string;
  subtitle: string;
  productName: string;
  price: string;
  primaryCta: Cta;
  trustPoints: string[];
}

export interface CommunityVoice {
  quote: string;
  user: string;
  meta: string;
}

export interface Community {
  eyebrow: string;
  title: string;
  subtitle: string;
  voices: CommunityVoice[];
  footnote: string;
}

export interface HomeContent {
  meta: HomeMeta;
  closingLine?: string;
  brand: Brand;
  hero: HomeHero;
  demo: HomeDemo;
  whyNotPhone: WhyNotPhone;
  tasks: TasksSection;
  integrations: Integrations;
  recall: Recall;
  community: Community;
  trust: Trust;
  focus: Focus;
  homeFaq: HomeFaq;
  hardware: Hardware;
  finalCta: FinalCta;
}

// ---------- site chrome (header nav + footer) ----------

export interface NavLink {
  label: string;
  href: string;
}

export interface CommonNav {
  brand: string;
  logo: { src: string; alt: string };
  links: NavLink[];
  shop: { label: string; href: string };
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface CommonFooter {
  closingLine: string;
  columns: FooterColumn[];
  socials: { name: string; href: string }[];
  copyright: string;
}

export interface CommonContent {
  nav: CommonNav;
  footer: CommonFooter;
}
