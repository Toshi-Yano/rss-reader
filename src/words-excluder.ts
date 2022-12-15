import { Convertable } from './interfaces';

export class WordsExcluder implements Convertable {
  regExp1: RegExp;
  constructor(private words: ReadonlyArray<string>) {
    this.regExp1 = new RegExp(`\\b(${this.words.join('|')})\\b`, 'g');
  }

  convertFromString(value: string) {
    // url, guid → isPermaLinkがtrueならurl、それ以外なら削除してOK?
    return value.replace(this.regExp1, '');
  }

  convertFromArray(values: string[]) {
    return values.map((v) => this.convertFromString(v));
  }
}
