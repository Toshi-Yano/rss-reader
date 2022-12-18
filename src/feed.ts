import { Channel } from './types';

const MAX_TEXT_LENGTH_PER_ROW = 80;
const DELIMITER_LINE_DOUBLE = '='.repeat(MAX_TEXT_LENGTH_PER_ROW);
const DELIMITER_LINE_SINGLE = '-'.repeat(MAX_TEXT_LENGTH_PER_ROW);

export class Feed {
  constructor(public channel: Channel) {}

  /**
   * channel・Itemから出力する要素を抽出し、フォーマットされた文字列型で返却する
   * @returns 出力対象の文字列
   */
  describe() {
    const displayValues = [
      DELIMITER_LINE_DOUBLE,
      ...this.getChannelFields(),
      DELIMITER_LINE_DOUBLE,
      ...this.getItemsFields(),
    ];

    return displayValues.join('\n');
  }

  /**
   * Channel要素から出力対象の文字列を抽出して返却する
   * @returns Channel要素の出力対象文字列が格納された配列
   */
  private getChannelFields() {
    return [this.channel.link, this.channel.title, this.channel.description];
  }

  /**
   * Item要素から出力対象の文字列を抽出して返却する
   * @returns Item要素の出力対象文字列が格納された配列
   */
  private getItemsFields() {
    return this.channel.items.map((item) =>
      [
        item.link,
        this.formateDate(item.pubDate),
        item.title,
        item.categories?.join(' | '),
        item.description,
        DELIMITER_LINE_SINGLE,
      ].join('\n'),
    );
  }

  /**
   * フィードの日付形式をフォーマットして返却する
   * @param dateStr "Sat, 07 Sep 2002 00:00:01 GMT"形式の日付を表す文字列
   * @returns       "2002-09-07"形式の文字列
   */
  private formateDate(dateStr: string | undefined) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
