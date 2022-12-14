import { Channel } from './types';

export interface RSSReader {
  loadParsedRSS(): Promise<Channel[]>;
}

export interface Convertable {
  convert(value: string): string | string[];
  // convert(value: string[]): string;
  // convert(value: string): string;
}

export interface Consumer {
  use(): void;
}

// ブラケット記法でプロパティへアクセスするため、rss-parserのItemを拡張
// export interface Output<T> {
//   [key: string]: any;
// }

// export interface Item {
//   [key: string]: any;
// }
