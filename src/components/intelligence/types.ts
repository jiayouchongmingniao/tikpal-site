// Shared content shapes for the /intelligence i18n pages.
// Every src/content/intelligence/i18n/{lang}.json file follows this schema exactly.

export interface IntelligenceMeta {
  title: string;
  description: string;
}

export interface IntelligenceHero {
  eyebrow: string;
  headline: string;
  subtitle: string;
}

// `type` is the entity kind shown as a small tag (Person / Project / ...).
// `edge` labels the line from this node to the next one; an empty string
// renders the connector without a label. The last node's edge is unused.
export interface IntelligenceChainNode {
  name: string;
  type: string;
  edge: string;
}

// a second, everyday demo: the same understanding applied to a family
// birthday, closed by the question the user asks days later.
export interface IntelligenceFollowup {
  whenLabel: string;
  question: string;
  answer: string;
}

export interface IntelligenceLifeDemo {
  quoteLabel: string;
  quote: string;
  chain: IntelligenceChainNode[];
  followup: IntelligenceFollowup;
}

// the work demo, reduced to one quiet line so the family story owns the
// first screen: a label plus the bare chain of names, no types or edges.
// The speaker project is developed properly in the evolve and state sections.
export interface IntelligenceWorkTeaser {
  label: string;
  nodes: string[];
}

export interface IntelligenceBelong {
  title: string;
  // second heading line, e.g. "And what it means now."
  titleLine2: string;
  // consumer-value punchline under the title
  valueLine: string;
  life: IntelligenceLifeDemo;
  work: IntelligenceWorkTeaser;
}

export interface IntelligenceEvolve {
  title: string;
  stages: string[];
  closing: string;
}

export interface IntelligenceStateRow {
  label: string;
  value: string;
}

// where a real-world object stands right now: status, open commitment, risk.
export interface IntelligenceState {
  title: string;
  subject: string;
  rows: IntelligenceStateRow[];
}

export interface IntelligenceAsk {
  title: string;
  youLabel: string;
  question: string;
  tikpalLabel: string;
  answers: string[];
  targets: string[];
  cta: { label: string; href: string };
}

export interface IntelligenceContent {
  meta: IntelligenceMeta;
  closingLine?: string;
  hero: IntelligenceHero;
  belong: IntelligenceBelong;
  evolve: IntelligenceEvolve;
  state: IntelligenceState;
  ask: IntelligenceAsk;
}
