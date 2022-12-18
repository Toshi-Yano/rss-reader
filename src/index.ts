import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Reader } from './reader';
import { Convertor } from './convertor';
import { WordsExcluder } from './words-excluder';
import { Feed } from './feed';
import { Readable } from './interfaces';
import { EXCLUDED_WORDS } from './app-config';

/**
 *
 * @param reader Readableインターフェースを実装したインスタンス
 * @param convertor Convertableインターフェースを実装したインスタンス
 * @returns フェードインスタンスのPromise配列
 */
const readFeeds = async (reader: Readable<Feed>, convertor?: Convertor) => {
  const feeds = await reader.fetchParsedFeeds();
  convertor &&
    feeds.forEach((feed) => {
      convertor.executes(feed.channel);
    });
  return feeds;
};

(async () => {
  const rl = readline.createInterface({ input, output });
  const inputURLs = await rl.question(
    '出力したいRSSフィードのURLを入力してください。',
  );

  const reader = new Reader(inputURLs.split(' '));
  const convertor = new Convertor([new WordsExcluder(EXCLUDED_WORDS)]);
  const feeds = await readFeeds(reader, convertor);
  feeds.forEach((feed) => {
    console.log(feed.describe());
  });

  rl.close();
})();
