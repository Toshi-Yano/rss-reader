import { Feed } from './feed';

export interface Readable {
  fetchParsedFeeds(): Promise<Feed[]>;
}

export interface Convertable {
  convertFromString(value: string): string;
  convertFromArray(values: string[]): string[];
}
