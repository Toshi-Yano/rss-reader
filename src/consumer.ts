import { Feed } from './feed';
import { Consumable } from './interfaces';

export class Consumer {
  constructor(private consumers: ReadonlyArray<Consumable>) {}

  /**
   * Consumableインターフェースを実装したクラスでFeedインスタンスを使用する
   * @param feed Feedインタンス
   */
  executes(feed: Feed) {
    this.consumers.forEach((consumer) => {
      consumer.use(feed);
    });
  }
}
