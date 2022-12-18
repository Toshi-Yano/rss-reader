// index.jsのreadFeeds()に引数として渡す、フィード取得処理を実装するためのインターフェース
export interface Readable<T> {
  fetchParsedFeeds(): Promise<T[]>;
}

// index.jsのreadFeeds()にオプション引数として渡す、取得したフィードを変換する処理を実装するためのインターフェース
export interface Convertable {
  convertFromString(value: string): string;
  convertFromArray(values: string[]): string[];
}
