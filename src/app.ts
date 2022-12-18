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
      convertor.executes(feed.channel);
    });
  return feeds;
};

(async () => {
  const reader = new Reader(INPUT_URLS);
  const convertor = new Convertor([
    new WordsExcluder(EXCLUDED_WORDS),
    // new WordsExcluder(['Blog', 'github', '開発']),
  ]);
  const feeds = await readFeeds(reader, convertor);
  feeds.forEach((feed) => {
    console.log(feed.describe());
  });
})();
