// src/ts/__tests__/node/GameStateService.test.ts
import GameStateService from '../../GameStateService';

describe('GameStateService', () => {
  let service: GameStateService;
  let mockStorage: Storage;

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    };
    service = new GameStateService(mockStorage);
  });

  describe('save', () => {
    test('должен сохранять состояние в storage', () => {
      const state = { level: 1, score: 100 };
      service.save(state);
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'state',
        JSON.stringify(state)
      );
    });

    test('должен выбрасывать ошибку при невалидном состоянии', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const circularObj: any = {};
      circularObj.self = circularObj; // Создаём циклическую ссылку
      expect(() => service.save(circularObj)).toThrow('Invalid state');
    });
  });

  describe('load', () => {
    test('должен загружать состояние из storage', () => {
      const state = { level: 1, score: 100 };
      (mockStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(state));
      expect(service.load()).toEqual(state);
    });

    test('должен возвращать пустой объект, если нет сохранённого состояния', () => {
      (mockStorage.getItem as jest.Mock).mockReturnValue(null);
      expect(service.load()).toEqual({});
    });

    test('должен выбрасывать ошибку при невалидном JSON', () => {
      (mockStorage.getItem as jest.Mock).mockReturnValue('invalid json');
      expect(() => service.load()).toThrow('Invalid state');
    });
  });
});
