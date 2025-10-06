// src/ts/__tests__/node/GameStateService.test.ts
import GameStateService from '../../GameStateService';

// Мок для localStorage
class MockStorage implements Storage {
  private store: { [key: string]: string } = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  clear(): void {
    this.store = {};
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }
}

// Тестовые данные
const testState = {
  level: 1,
  maxScore: 100,
  playerTeamData: [
    {
      character: {
        type: 'swordsman',
        level: 1,
        health: 100,
        attack: 40,
        defence: 10,
      },
      position: 0,
    },
  ],
  enemyTeamData: [
    {
      character: {
        type: 'daemon',
        level: 1,
        health: 100,
        attack: 30,
        defence: 20,
      },
      position: 7,
    },
  ],
};

describe('GameStateService', () => {
  let storage: MockStorage;
  let service: GameStateService;

  beforeEach(() => {
    storage = new MockStorage();
    service = new GameStateService(storage);
  });

  afterEach(() => {
    storage.clear();
  });

  describe('save', () => {
    test('должен успешно сохранять валидное состояние', () => {
      service.save(testState);
      expect(storage.getItem('state')).toBe(JSON.stringify(testState));
    });

    test('должен выбрасывать ошибку при невалидном состоянии', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invalidState: any = {};
      invalidState.cycle = invalidState;
      expect(() => service.save(invalidState)).toThrow('Invalid state');
    });
  });

  describe('load', () => {
    test('должен успешно загружать сохранённое состояние', () => {
      storage.setItem('state', JSON.stringify(testState));
      const loadedState = service.load();
      expect(loadedState).toEqual(testState);
    });

    test('должен выбрасывать ошибку, если нет сохранённого состояния', () => {
      expect(() => service.load()).toThrow('No saved state');
    });

    test('должен выбрасывать ошибку при невалидном JSON', () => {
      storage.setItem('state', '{ invalid json }');
      expect(() => service.load()).toThrow('Invalid state');
    });
  });
});
