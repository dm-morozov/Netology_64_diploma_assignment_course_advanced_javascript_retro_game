// src/ts/GameStateService.ts

export default class GameStateService {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  save(state: object) {
    this.storage.setItem('state', JSON.stringify(state));
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem('state') || '{}');
    } catch (e) {
      throw new Error('Invalid state' + e);
    }
  }
}
