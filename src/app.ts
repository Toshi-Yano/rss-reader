import { Reader } from './reader';
import { WordsExcluder } from './words-excluder';
import { RSSReader, Consumer } from './interfaces';
import { Convertor } from './convertor';

const subscribeUrls = ['https://tech.uzabase.com/rss'];
const excludeWords = ['NewsPicks'];

const readRSS = async (
  reader: RSSReader,
  convertor: Convertor,
  consumer?: Consumer,
) => {
  const channels = await reader.loadParsedRSS();
  // console.log({ channels });
};

const readRSSFromURLs = async (urls: ReadonlyArray<string>) => {
  const reader = new Reader(urls);
  const convertors = [new WordsExcluder(excludeWords)];
  const convertor = new Convertor(convertors);

  readRSS(reader, convertor);
  // const consumer = new StdOuter();
  // consumer.executes();
  // }
};

readRSSFromURLs(subscribeUrls);
