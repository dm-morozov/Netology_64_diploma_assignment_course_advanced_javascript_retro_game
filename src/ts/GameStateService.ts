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

  load(): object {
    const state = this.storage.getItem('state');
    if (!state) {
      throw new Error('No saved state'); // Добавляем выброс ошибки
    }
    try {
      return JSON.parse(state);
    } catch (e) {
      throw new Error('Invalid state' + e);
    }
  }
}
