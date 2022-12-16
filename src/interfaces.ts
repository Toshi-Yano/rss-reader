import { Channel } from './types';

export interface Readable {
  fetchParsedRSS(): Promise<Channel[]>;
}

export interface Convertable {
  convertFromString(value: string): string;
  convertFromArray(values: string[]): string[];
}
