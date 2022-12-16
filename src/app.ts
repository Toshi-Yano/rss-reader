import { Readable } from './interfaces';
import { Reader } from './reader';
import { Convertor } from './convertor';
import { WordsExcluder } from './words-excluder';

const INPUT_URLS = ['https://tech.uzabase.com/rss'];
// const INPUT_URLS = ['http://www.openspc2.org/RSS/Atom/link/sample.xml'];
const EXCLUDED_WORDS = ['NewsPicks'];

const readRSS = async (reader: Readable, convertor?: Convertor) => {
  const channels = await reader.fetchParsedRSS();
  convertor &&
    channels.forEach((channel) => {
      convertor.executes(channel);
    });
  return channels;
};

(async () => {
  const reader = new Reader(INPUT_URLS);
  const convertor = new Convertor([
    new WordsExcluder(EXCLUDED_WORDS),
    // new WordsExcluder(['tatsuhiro_hori']),
    // new WordsExcluder(['Blog']),
    // new WordsExcluder(['uzabase']),
    // new WordsExcluder(['SPEEDA', 'ユーザベース', 'uzabase', 'blogs']),
  ]);

  const channels = await readRSS(reader, convertor);
  channels.forEach((channel) => {
    // console.dir(channel, { depth: null });
    // console.log('%o', channel);
    // console.log(channel);
    // console.log(...describe());
    // console.log(channel);
    // for (const [key, value] of Object.entries(channel)) {
    //   if (key === 'items') {
    //     console.log(`${key} : ${value[0]}`);
    //     console.log(value[0]);
    //   }
    // }
  });
})();
