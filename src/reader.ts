import Parser from 'rss-parser';
import { Feed } from './feed';
import { Readable } from './interfaces';
import { Channel, Item } from './types';

export class Reader implements Readable<Feed> {
  private readonly parser: Parser<Channel, Item>;

  constructor(private inputUrls: ReadonlyArray<string>) {
    // rss-parserのOutput, Item型に定義されていない要素を正確な名称で取得するため、customFieldsにRSS用の定義を追加
    // 取得するフィードが増え、正確な名称が要する項目が増加した際は定義の追加が必要
    this.parser = new Parser({
      customFields: {
        feed: ['lastBuildDate', 'docs', 'generator'],
        item: ['description'],
      },
    });
  }

  /**
   * 対象の全URLからフィードを取得し、Feedインスタンスとして返却する
   * @returns Feedインスタンスの配列
   */
  async fetchParsedFeeds() {
    const feeds: Feed[] = [];
    for (const url of this.inputUrls) {
      feeds.push(new Feed(await this.parser.parseURL(url)));
    }
    return feeds;
  }
}
