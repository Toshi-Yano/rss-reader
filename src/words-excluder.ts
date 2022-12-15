import { Convertable } from './interfaces';

const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export class WordsExcluder implements Convertable {
  private readonly excludedWordsRegex: RegExp;
  constructor(private words: ReadonlyArray<string>) {
    this.excludedWordsRegex = new RegExp(`(${this.words.join('|')})`, 'g');
  }

  convertFromString(value: string) {
    if (URL_REGEX.test(value)) {
      return value;
    }
    return value.replaceAll(this.excludedWordsRegex, '');
  }

  convertFromArray(values: string[]) {
    return values.filter((v) => !this.excludedWordsRegex.test(v));
  }
}
