export type Channel = {
  title: string;
  link: string;
  description: string;
  lastBuildDate?: string;
  docs?: string;
  generator?: string;
  items: Item[];

  // language?: string;
  // copyright?: string;
  // managingEditor?: string;
  // webMaster?: string;
  // pubDate?: string;
  // cloud?: string;
  // ttl?: number;
  // image?: string;
  // rating?: string;
  // textInput?: string;
  // skipHours?: string;
  // skipDays?: string;
  // categories?: string[];
};

export type Item = {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  guid?: string;
  categories?: string[];
  enclosure?: Enclosure;

  // source?: string;
  // author?: string;
  // comments?: string;

  // creator?: string;
  // summary?: string;
  // content?: string;
  // isoDate?: string;
  // contentSnippet?: string;
};

export type Enclosure = {
  url: string;
  length: number;
  type: string;
};

// export type URL = {
//   url: string;
// };

// export type CustomFeed = {
//   lastBuildDate?: string;
//   docs?: string;
//   generator?: string;
// };

// export type CustomItem = { description?: string };

// export const ParserCustomFeedFields = ['lastBuildDate', 'docs', 'generator'];
// export const ParserCustomItemFields = ['description'];
