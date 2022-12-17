import { Feed } from './feed';
import { Convertable } from './interfaces';
import { Channel, Enclosure, Item } from './types';

export class Convertor {
  constructor(private convertors: ReadonlyArray<Convertable>) {}

  /**
   * Feedインタンスのchannelから再帰処理を開始する
   * @param channel フィード：Channel要素
   */
  executes(channel: Channel) {
    this.mightConvertRecursively(channel);
  }

  /**
   * フィードの各要素に対して再帰的に値を探索し、convertorsによる変換処理を行う
   * @param element フィード：Channel | Item | Enclosure
   * @returns       void
   */
  mightConvertRecursively(element: Channel | Item | Enclosure) {
    if (element === undefined || element === null) return;

    for (let [key, value] of Object.entries(element)) {
      if (typeof value === 'string') {
        element[key] = this.useAllConvertor(value);
      } else if (Array.isArray(value)) {
        this.tryConvertValuesInArray(element, key, value);
      } else {
        this.mightConvertRecursively(value);
      }
    }
  }

  /**
   * 配列内の値を変換 or 配列内のobjectをmightConvertRecursively()で再探索する
   * @param element フィード：Channel | Item
   * @param key     プロパティ名
   * @param value   配列型の値（Item・Item.categoryなどを想定）
   * @returns       void
   */
  tryConvertValuesInArray(
    element: Channel | Item,
    key: string,
    value: Array<string | object>,
  ) {
    if (value.length === 0) return;

    // 配列の中身がstring以外 = objectの場合は再帰処理を実行（Item[]を想定）
    if (typeof value[0] !== 'string') {
      value.forEach((v) => {
        this.mightConvertRecursively(v as Item);
      });
      return;
    }

    // その他はstring[]のため型ガードで宣言の後、変換処理を実行
    const stringArray = value.filter((v) => typeof v === 'string') as string[];
    element[key] = this.useAllConvertor(stringArray);
  }

  /**
   * 引数の型に合わせて全convertorsによる変換処理を実行する
   * @param target 変換対象の値 or 変換対象の値を含む配列
   * @returns      変換後の値 or 変換後の値を含む配列
   */
  useAllConvertor(target: string | string[]) {
    let result = target;
    this.convertors.forEach((convertor) => {
      result = Array.isArray(result)
        ? (convertor.convertFromArray(result) as string[])
        : (convertor.convertFromString(result) as string);
    });
    return result;
  }
}
