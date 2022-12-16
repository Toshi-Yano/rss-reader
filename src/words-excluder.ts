import { Convertable } from './interfaces';

const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export class WordsExcluder implements Convertable {
  private readonly excludedWordsRegex: RegExp;
  constructor(private words: ReadonlyArray<string>) {
    // 単語の区切りを無視したグローバルサーチ
    this.excludedWordsRegex = new RegExp(`(${this.words.join('|')})`, 'g');
  }

  /**
   * URL以外の文字列から、対象の単語を全て除外して返却する
   * @param value 変換検証対象の値
   * @returns     単語除外後の値
   */
  convertFromString(value: string) {
    if (URL_REGEX.test(value)) {
      return value;
    }
    return value.replaceAll(this.excludedWordsRegex, '');
  }

  /**
   * 対象の単語を含む値を取り除いた配列を返却する（URLは処理対象外）
   * 例）valuesが['abc', 'xyz', 'https://example/ab']、 対象の単語が'ab'の場合、['xyz', 'https://example/ab']を返却する
   * @param values 変換検証対象の値を含む配列
   * @returns      対象の単語を含まない値 or 全てのURLを保持する配列
   */
  convertFromArray(values: string[]) {
    return values.filter(
      (v) => !this.excludedWordsRegex.test(v) || URL_REGEX.test(v),
    );
  }
}
