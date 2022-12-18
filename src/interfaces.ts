// フィード取得処理用のインターフェース
export interface Readable<T> {
  fetchParsedFeeds(): Promise<T[]>;
}

// 取得したフィードの変換処理用インターフェース
export interface Convertable {
  convertFromString(value: string): string;
  convertFromArray(values: string[]): string[];
}
