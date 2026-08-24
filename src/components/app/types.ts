// Shared content shapes for the /app i18n pages.
// Every src/content/app/i18n/{lang}.json file follows this schema exactly.

export interface AppMeta {
  title: string;
  description: string;
}

export interface AppDownload {
  label: string;
  href: string;
}

export interface AppHero {
  eyebrow: string;
  headline: string;
  subtitle: string;
  primaryCta: string;
  statusLine: string;
  downloads: AppDownload[];
}

export interface AppTimelineEntry {
  time: string;
  kind: string;
}

export interface AppSummaryCard {
  title: string;
  meta: string;
  coreIdea: { label: string; text: string };
  next: { label: string; text: string };
}

export interface AppCapture {
  title: string;
  timeline: {
    label: string;
    entries: AppTimelineEntry[];
  };
  summaryCard: AppSummaryCard;
}

export interface AppTasks {
  title: string;
  subtitle: string;
  points: { name: string; detail: string }[];
  examples: string;
}

export interface AppDevices {
  title: string;
  multiDevice: {
    src: string;
    alt: string;
  };
  actions: string[];
}

export interface AppCta {
  title: string;
  label: string;
  href: string;
}

export interface AppPageContent {
  meta: AppMeta;
  closingLine?: string;
  hero: AppHero;
  capture: AppCapture;
  tasks: AppTasks;
  devices: AppDevices;
  cta: AppCta;
}
