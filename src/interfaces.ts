import { Feed } from './feed';

// フィード取得処理用のインターフェース
export interface Readable<T> {
  fetchParsedFeeds(): Promise<T[]>;
}

// 取得したフィードの変換処理用インターフェース
export interface Convertable {
  convertFromString(value: string): string;
  convertFromArray(values: string[]): string[];
}

// 取得したフィードを使用するインターフェース
export interface Consumable {
  use(feed: Feed): void;
}
