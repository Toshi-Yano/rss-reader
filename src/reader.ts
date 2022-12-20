import Parser from 'rss-parser';
import { Feed } from './feed';
import { Readable } from './interfaces';
import { Channel, Item } from './types';
import { PARSER_OPTIONS } from './app-config';

export class Reader implements Readable<Feed> {
  private readonly parser: Parser<Channel, Item>;

  /**
   * rss-parserのOutput, Item型に定義されていない要素を正確な名称で取得するため、customFieldsにRSS用の定義を追加
   * 取得するフィードが増え、正確な名称が要する項目が増加した際は定義の追加が必要
   * @param inputUrls 取得対象フィードURLの配列
   */
  constructor(private inputUrls: ReadonlyArray<string>) {
    this.parser = new Parser({
      customFields: {
        feed: PARSER_OPTIONS.feedCustomFields,
        item: PARSER_OPTIONS.itemCustomFields,
      },
    });
  }

  /**
   * 対象の全URLからフィードを取得し、Feedインスタンスとして返却する
   * @returns Feedインスタンスの配列
   */
  async fetchParsedFeeds() {
    const parsedFeedPromises = this.inputUrls.map((url) =>
      this.parser.parseURL(url),
    );
    const parsedFeeds = await Promise.all(parsedFeedPromises);
    return parsedFeeds.map((result) => new Feed(result));
  }
}
