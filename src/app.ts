import { Reader } from './reader';
import { Convertor } from './convertor';
import { WordsExcluder } from './words-excluder';
import { Feed } from './feed';
import { Readable } from './interfaces';

const INPUT_URLS = ['https://tech.uzabase.com/rss'];
// const INPUT_URLS = ['http://www.openspc2.org/RSS/Atom/link/sample.xml'];
const EXCLUDED_WORDS = ['NewsPicks'];

const readFeeds = async (reader: Readable<Feed>, convertor?: Convertor) => {
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
    // new WordsExcluder(['Blog', 'asano', 'F#']),
  ]);
  const feeds = await readFeeds(reader, convertor);
  feeds.forEach((feed) => {
    console.log(feed.describe());
  });
})();
