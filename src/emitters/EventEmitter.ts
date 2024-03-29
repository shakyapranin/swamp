import { Observer } from "../interfaces/Observer";

export default class EventEmitter {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: object): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}
