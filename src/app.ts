import { Reader } from './reader';
import { WordsExcluder } from './words-excluder';
import { RSSReader, Consumer } from './interfaces';
import { Convertor } from './convertor';

const subscribeUrls = ['https://tech.uzabase.com/rss'];
// const subscribeUrls = ['http://www.openspc2.org/RSS/Atom/link/sample.xml'];
const excludeWords = ['NewsPicks'];

const readRSS = async (
  reader: RSSReader,
  convertor?: Convertor,
  consumer?: Consumer,
) => {
  const channels = await reader.loadParsedRSS();
  // console.log({ channels });
  convertor &&
    channels.forEach((channel) => {
      convertor.executes(channel);
      // consumer?.();
    });
};

const readRSSFromURLs = async (urls: ReadonlyArray<string>) => {
  const reader = new Reader(urls);
  const convertor = new Convertor([
    new WordsExcluder(excludeWords),
    // new WordsExcluder(['SPEEDA', 'ユーザベース', 'uzabase', 'blogs']),
  ]);
  // const consumer = new Consumer([new StdOuter()]);

  readRSS(reader, convertor);
};

readRSSFromURLs(subscribeUrls);
