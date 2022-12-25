import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Reader } from './reader';
import { Convertor } from './convertor';
import { Consumer } from './consumer';
import { WordsExcluder } from './words-excluder';
import { FileWriter } from './file-writer';
import { Feed } from './feed';
import { Readable } from './interfaces';
import { EXCLUDED_WORDS } from './app-config';

/**
 * フィードを取得し、convertorが存在する場合は変換処理を行った上で返却する
 * @param reader    フィード取得処理用のインスタンス
 * @param convertor 取得したフィードの変換処理用のインスタンス
 * @param consumer  取得したフィードを使用するインスタンス
 * @returns         FeedインスタンスのPromise配列
 */
const readFeeds = async (
  reader: Readable<Feed>,
  convertor?: Convertor,
  consumer?: Consumer,
) => {
  const feeds = await reader.fetchParsedFeeds();
  feeds.forEach((feed) => {
    convertor && convertor.executes(feed);
    consumer && consumer.executes(feed);
  });
  return feeds;
};

/**
 * 入力されたURLからフィードを取得し、変換と使用を行う
 */
(async () => {
  const rl = readline.createInterface({ input, output });
  const inputURLs = await rl.question(
    '取得したいRSSフィードのURLを入力してください。半角スペースで区切ると複数入力可能です',
  );

  const reader = new Reader(inputURLs.split(' '));
  const convertor = new Convertor([new WordsExcluder(EXCLUDED_WORDS)]);
  const consumer = new Consumer([new FileWriter()]);

  await readFeeds(reader, convertor, consumer);
  rl.close();
})();
