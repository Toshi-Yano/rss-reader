import * as fs from 'node:fs';
import { Feed } from './feed';
import { Consumable } from './interfaces';

export class FileWriter implements Consumable {
  /**
   * Feedインスタンスからテキストファイルを作成する
   * @param feed Feedインタンス
   */
  use(feed: Feed) {
    console.log(feed.describe());
    try {
      fs.writeFileSync(`./${feed.channel.title}.txt`, feed.describe());
    } catch (error) {
      console.error(error);
    }
  }
}
