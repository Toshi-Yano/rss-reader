import { Convertable } from './interfaces';
import { Channel, Enclosure, Item } from './types';

export class Convertor {
  constructor(private convertors: ReadonlyArray<Convertable>) {}

  executes(channel: Channel) {
    this.mightConvertRecursively(channel);
    // console.log('--------------------------');
    // console.log({ channel });
    // const item: Item = channel.items[0];
    // console.log('--------------------------');
    // console.log({ item });

    // console.log('-------------------------');
    // let count = 0;
    // for (let i = 0; i < 2; i++) {
    //   console.log(channel.items[i]);
    // }
    // channel.items.forEach((item) => {
    //   console.log(item);
    // });

    // console.log('--------------------------');
    // this.iterateElementInArray(channel.items, channel, 'items');
  }

  mightConvertRecursively(element: Channel | Item | Enclosure) {
    if (element === undefined || element === null) return;

    for (let [key, value] of Object.entries(element)) {
      if (typeof value === 'string') {
        element[key] = this.useAllConvertor(value);
      } else if (Array.isArray(value)) {
        this.iterateElementInArray(value, element, key);
      } else {
        this.mightConvertRecursively(value);
      }
    }
  }

  iterateElementInArray(
    value: Array<string | object>,
    element: Channel | Item | Enclosure,
    key: string,
  ) {
    // console.log(`${key} : ${value} : ${typeof value[0]}`);
    // if (key === 'items') {
    //   console.log(`${value} : ${typeof value[0]}`);
    //   console.log(Array.isArray(value));
    // }

    if (value.length === 0) return;
    // if (typeof value[0] !== 'string') this.mightConvertRecursively(value);
    if (typeof value[0] !== 'string') {
      value.forEach((v) => {
        this.mightConvertRecursively(v as Item);
      });
      return;
      // if (key === 'items') {
      //   console.log('fdjkafjalk;');
      //   // element[key] =
      //   value.forEach((v) => {
      //     this.mightConvertRecursively(v as Item);
      //   });
      //   return;
      // }
      // this.mightConvertRecursively(value);
    }

    const stringArray = value.filter((v) => typeof v === 'string') as string[];
    // console.log(stringArray);

    element[key] = this.useAllConvertor(stringArray);
  }

  useAllConvertor(arg: string | string[]) {
    let result = arg;
    this.convertors.forEach((convertor) => {
      result = Array.isArray(result)
        ? (convertor.convertFromArray(result) as string[])
        : (convertor.convertFromString(result) as string);

      // let value = typeof arg === 'string' ? (arg as string) : (arg as string[]);
      // if (typeof arg === 'string') {
      //   // const newValue = value as string;
      //   // convertor.convertFromString(newValue);
      //   convertor.convertFromString(value);
      // } else if (Array.isArray(arg)) {
      //   const newValue = value as string[];
      //   convertor.convertFromArray(newValue);
      // }
    });
    return result;
  }
}
