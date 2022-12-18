import { Channel } from './types';

const MAX_TEXT_LENGTH_PER_ROW = 80;
const DELIMITER_LINE_DOUBLE = '='.repeat(MAX_TEXT_LENGTH_PER_ROW);
const DELIMITER_LINE_SINGLE = '-'.repeat(MAX_TEXT_LENGTH_PER_ROW);

export class Feed {
  constructor(public channel: Channel) {}

  describe() {
    const displayValues = [
      DELIMITER_LINE_DOUBLE,
      ...this.getChannelFields(),
      DELIMITER_LINE_DOUBLE,
      ...this.getItemsFields(),
    ];

    return displayValues.join('\n');
  }

  private getChannelFields() {
    return [this.channel.link, this.channel.title, this.channel.description];
  }

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

  private formateDate(dateStr: string | undefined) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
