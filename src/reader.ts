import Parser from 'rss-parser';
import { Readable } from './interfaces';
import { Channel, Item } from './types';

export class Reader implements Readable {
  private readonly parser: Parser<Channel, Item>;

  constructor(private subscribeUrls: ReadonlyArray<string>) {
    // rss-parserのOutput, Item型に定義されていない要素を正確な名称で取得するため、customFieldsに定義を追加
    // 購読するRSSが増え対象項目が増加した際は定義の追加が必要
    this.parser = new Parser({
      customFields: {
        feed: ['lastBuildDate', 'docs', 'generator'],
        item: ['description'],
      },
    });
  }

  /**
   * 対象URLからRSSを取得し、Channel[]型へ変換して返却する
   * @returns 全てのURLを元に取得した、Itemを子に持つChannel
   */
  async fetchParsedRSS() {
    const channels: Channel[] = [];
    for (const url of this.subscribeUrls) {
      channels.push(await this.parser.parseURL(url));
    }
    return channels;
  }
}
