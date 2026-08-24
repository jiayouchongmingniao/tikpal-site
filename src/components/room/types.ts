// Shared content shapes for the /room i18n pages.
// Every src/content/room/i18n/{lang}.json file follows this schema exactly.

export interface RoomMeta {
  title: string;
  description: string;
}

export interface RoomHero {
  eyebrow: string;
  headline: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  statusLine: string;
}

export interface RoomState {
  id: string;
  name: string;
  caption: string;
}

export interface RoomStates {
  title: string;
  items: RoomState[];
  footnote: string;
}

export interface RoomLineupItem {
  id: string;
  name: string;
  tagline: string;
  distance: string;
  best: string;
  specs: string[];
  image: string;
}

export interface RoomLineup {
  title: string;
  subtitle: string;
  cta: string;
  items: RoomLineupItem[];
}

export interface RoomSystemItem {
  name: string;
  for: string;
  badge?: string;
}

export interface RoomSystems {
  title: string;
  headline: string;
  note: string;
  items: RoomSystemItem[];
}

export interface RoomCta {
  title: string;
  label: string;
  href: string;
}

export interface RoomContent {
  meta: RoomMeta;
  closingLine?: string;
  hero: RoomHero;
  states: RoomStates;
  lineup: RoomLineup;
  systems: RoomSystems;
  cta: RoomCta;
}
