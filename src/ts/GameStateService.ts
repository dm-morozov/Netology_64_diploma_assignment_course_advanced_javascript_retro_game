// src/ts/GameStateService.ts

export default class GameStateService {
  public storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  save(state: object): void {
    try {
      this.storage.setItem('state', JSON.stringify(state));
    } catch (e) {
      throw new Error('Invalid state' + e);
    }
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem('state') || '{}');
    } catch (e) {
      throw new Error('Invalid state' + e);
    }
  }
}
