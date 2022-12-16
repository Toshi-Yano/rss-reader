import { Readable } from './interfaces';
import { Reader } from './reader';
import { Convertor } from './convertor';
import { WordsExcluder } from './words-excluder';

const INPUT_URLS = ['https://tech.uzabase.com/rss'];
// const INPUT_URLS = ['http://www.openspc2.org/RSS/Atom/link/sample.xml'];
const EXCLUDED_WORDS = ['NewsPicks'];

const readFeeds = async (reader: Readable, convertor?: Convertor) => {
  const feeds = await reader.fetchParsedFeeds();
  convertor &&
    feeds.forEach((feed) => {
      convertor.executes(feed);
    });
  return feeds;
};

(async () => {
  const reader = new Reader(INPUT_URLS);
  const convertor = new Convertor([
    new WordsExcluder(EXCLUDED_WORDS),
    // new WordsExcluder(['Podcast']),
    // new WordsExcluder(['専任エンジニアリングマネージャ']),
    // new WordsExcluder(['Blog']),
    // new WordsExcluder(['Uzabase']),
    // new WordsExcluder(['uzabase']),
    // new WordsExcluder(['SPEEDA', 'ユーザベース', 'uzabase', 'blogs']),
  ]);

  const feeds = await readFeeds(reader, convertor);
  feeds.forEach((feed) => {
    // console.dir(channel, { depth: null });
    // console.log('%o', channel);
    // console.log(channel);
    // console.log(...describe());

    for (const [key, value] of Object.entries(feed.channel)) {
      if (key !== 'items') {
        console.log(`${key} : ${value}`);
      } else {
        console.log(value[0]);
      }
    }
  });
})();
