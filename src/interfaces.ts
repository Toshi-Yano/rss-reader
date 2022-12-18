export interface Readable<T> {
  fetchParsedFeeds(): Promise<T[]>;
}

export interface Convertable {
  convertFromString(value: string): string;
  convertFromArray(values: string[]): string[];
}
