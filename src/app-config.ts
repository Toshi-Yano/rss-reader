// words-excluder.tsで除外する単語
export const EXCLUDED_WORDS = ['News', 'Blog'];

// rss-parserのOutput(Feed), Item型で明示的に取得する要素名
export const PARSER_OPTIONS = {
  feedCustomFields: ['lastBuildDate', 'docs', 'generator'],
  itemCustomFields: [],
};
