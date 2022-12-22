import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as fs from 'node:fs';
import { Reader } from './reader';
import { Convertor } from './convertor';
import { WordsExcluder } from './words-excluder';
import { Feed } from './feed';
import { Readable } from './interfaces';
import { EXCLUDED_WORDS } from './app-config';

/**
 * フィードを取得し、convertorが存在する場合は変換処理を行った上で返却する
 * @param reader    フィード取得処理用のインスタンス
 * @param convertor 取得したフィードの変換処理用のインスタンス
 * @returns         FeedインスタンスのPromise配列
 */
const readFeeds = async (reader: Readable<Feed>, convertor?: Convertor) => {
  const feeds = await reader.fetchParsedFeeds();
  convertor &&
    feeds.forEach((feed) => {
      convertor.executes(feed.channel);
    });
  return feeds;
};

/**
 * 入力されたURLからフィードを取得し、標準出力を行う
 * オプションでフィードの変換処理を行う場合はConvertableインターフェースを実装したインスタンスをConvertorへ登録しておく
 * URLを半角スペースで区切ると複数の入出力が可能
 */
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
    try {
      fs.writeFileSync(`./${feed.channel.title}.txt`, feed.describe());
      console.log('finish');
    } catch (error) {
      console.error(error);
    }
  });
  rl.close();
})();
