import { Consumable } from './interfaces';
import { Channel } from './types';

export class Consumer {
  constructor(private consumers: ReadonlyArray<Consumable>) {}

  consumeAll(channel: Channel) {
    this.consumers.forEach((consumer) => {
      consumer.use(channel);
    });
  }
}
