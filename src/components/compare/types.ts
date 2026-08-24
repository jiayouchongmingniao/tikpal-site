// Content shape of the /compare/tikpal-vs-plaud page (all fields localized in 7 languages).

export interface CompareMeta {
  title: string;
  description: string;
}

export interface CompareHero {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface CompareShared {
  title: string;
  points: string[];
}

export interface CompareRow {
  label: string;
  tikpal: string;
  plaud: string;
}

export interface CompareTable {
  title: string;
  intro: string;
  rows: CompareRow[];
}

export interface CompareFit {
  tikpalTitle: string;
  tikpalPoints: string[];
  plaudTitle: string;
  plaudPoints: string[];
}

export interface CompareCta {
  title: string;
  button: {
    label: string;
    href: string;
  };
}

export interface ComparePageContent {
  meta: CompareMeta;
  hero: CompareHero;
  shared: CompareShared;
  table: CompareTable;
  fit: CompareFit;
  cta: CompareCta;
}
