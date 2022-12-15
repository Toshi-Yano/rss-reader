import { Convertable } from './interfaces';

export class WordsExcluder implements Convertable {
  private static readonly urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  private readonly excludedWordsRegex: RegExp;
  constructor(private words: ReadonlyArray<string>) {
    this.excludedWordsRegex = new RegExp(`(${this.words.join('|')})`, 'gi');
  }

  convertFromString(value: string) {
    if (!this.excludedWordsRegex.test(value)) {
      return value;
    }
    if (WordsExcluder.urlRegex.test(value)) {
      return '';
    }
    return value.replaceAll(this.excludedWordsRegex, '');
  }

  convertFromArray(values: string[]) {
    return values.filter((v) => !this.excludedWordsRegex.test(v));
  }
}
