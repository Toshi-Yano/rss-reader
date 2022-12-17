import { Channel } from './types';

const MAX_TEXT_LENGTH_PER_ROW = 80;
const DELIMITER_LINE_1 = '='.repeat(MAX_TEXT_LENGTH_PER_ROW);
const DELIMITER_LINE_2 = '-'.repeat(MAX_TEXT_LENGTH_PER_ROW);

export class Feed {
  constructor(public channel: Channel) {}

  describe() {
    const displayValueArray = [
      DELIMITER_LINE_1,
      ...this.getChannelFields(),
      ...this.getItemsFields(),
    ];

    return displayValueArray.join('\n');
  }

  private getChannelFields() {
    return [this.channel.link, this.channel.title, this.channel.description];
  }

  private getItemsFields() {
    return this.channel.items.map((item) =>
      [
        DELIMITER_LINE_2,
        item.link,
        item.pubDate,
        item.title,
        item.categories?.join(' / '),
        item.description,
      ].join('\n'),
    );
  }
}
