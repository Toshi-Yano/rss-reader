// （ATOMを除く）RSS要素のみ明示的に記載
export type Channel = {
  [key: string]: any;
  title: string;
  link: string;
  description: string;
  lastBuildDate?: string;
  docs?: string;
  generator?: string;
  items: Item[];
  language?: string;
  copyright?: string;
  managingEditor?: string;
  webMaster?: string;
  pubDate?: string;
  cloud?: string;
  ttl?: number;
  image?: string;
  rating?: string;
  textInput?: string;
  skipHours?: string;
  skipDays?: string;
  categories?: string[];
};

// （ATOMを除く）RSS要素のみ明示的に記載
export type Item = {
  [key: string]: any;
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  guid?: string;
  categories?: string[];
  enclosure?: Enclosure;
  source?: string;
  author?: string;
  comments?: string;
  creator?: string;
  summary?: string;
  content?: string;
  isoDate?: string;
  contentSnippet?: string;
};

export type Enclosure = {
  [key: string]: any;
  url: string;
  length: number;
  type: string;
};
