import {
  calcTileType,
  calcHealthLevel,
  formatCharacterInfo,
  calcMoveRange,
} from '../../utils';

describe('calcTileType', () => {
  test('должен вернуть "top-left" для индекса 0', () => {
    expect(calcTileType(0, 8)).toBe('top-left');
  });

  test('должен вернуть "top-right" для индекса 7', () => {
    expect(calcTileType(7, 8)).toBe('top-right');
  });

  test('должен вернуть "bottom-left" для индекса 56', () => {
    expect(calcTileType(56, 8)).toBe('bottom-left');
  });

  test('должен вернуть "bottom-right" для индекса 63', () => {
    expect(calcTileType(63, 8)).toBe('bottom-right');
  });

  test('должен вернуть "top" для индексов 1-6', () => {
    expect(calcTileType(1, 8)).toBe('top');
    expect(calcTileType(6, 8)).toBe('top');
  });

  test('должен вернуть "bottom" для индексов 57-62', () => {
    expect(calcTileType(57, 8)).toBe('bottom');
    expect(calcTileType(62, 8)).toBe('bottom');
  });

  test('должен вернуть "left" для индексов 8, 16, 24, 32, 40, 48', () => {
    expect(calcTileType(8, 8)).toBe('left');
    expect(calcTileType(16, 8)).toBe('left');
  });

  test('должен вернуть "right" для индексов 15, 23, 31, 39, 47, 55', () => {
    expect(calcTileType(15, 8)).toBe('right');
    expect(calcTileType(23, 8)).toBe('right');
  });

  test('должен вернуть "center" для центральных ячеек', () => {
    expect(calcTileType(20, 8)).toBe('center');
    expect(calcTileType(36, 8)).toBe('center');
  });

  test('должен работать для досок разных размеров', () => {
    expect(calcTileType(0, 4)).toBe('top-left');
    expect(calcTileType(3, 4)).toBe('top-right');
    expect(calcTileType(12, 4)).toBe('bottom-left');
    expect(calcTileType(15, 4)).toBe('bottom-right');
    expect(calcTileType(5, 4)).toBe('center');
  });
});

// ---

describe('calcHealthLevel', () => {
  test('должен вернуть "critical" при здоровье < 15', () => {
    expect(calcHealthLevel(14)).toBe('critical');
    expect(calcHealthLevel(0)).toBe('critical');
  });

  test('должен вернуть "normal" при здоровье от 15 до 49', () => {
    expect(calcHealthLevel(15)).toBe('normal');
    expect(calcHealthLevel(49)).toBe('normal');
  });

  test('должен вернуть "high" при здоровье >= 50', () => {
    expect(calcHealthLevel(50)).toBe('high');
    expect(calcHealthLevel(100)).toBe('high');
  });
});

// ---

describe('formatCharacterInfo', () => {
  test('должен форматировать характеристики персонажа в правильный формат', () => {
    const level = 1;
    const attack = 40;
    const defence = 10;
    const health = 100;
    const result = formatCharacterInfo`🎖${level} ⚔${attack} 🛡${defence} ❤${health}`;
    expect(result).toBe('🎖1 ⚔40 🛡10 ❤100');
  });

  test('должен корректно обрабатывать нулевые значения', () => {
    const level = 0;
    const attack = 0;
    const defence = 0;
    const health = 0;
    const result = formatCharacterInfo`🎖${level} ⚔${attack} 🛡${defence} ❤${health}`;
    expect(result).toBe('🎖0 ⚔0 🛡0 ❤0');
  });
});

// ---

describe('calcMoveRange', () => {
  test('должен возвращать правильные ячейки для радиуса 1 из позиции 27', () => {
    const result = calcMoveRange(27, 1); // Позиция 27 (ряд 3, столбец 3)
    expect(result).toEqual([18, 19, 20, 26, 28, 34, 35, 36]); // 8 ячеек: все соседние, включая диагонали
  });

  test('должен возвращать правильные ячейки для радиуса 2 из позиции 27', () => {
    const result = calcMoveRange(27, 2);
    expect(result).toEqual([
      9, 10, 11, 12, 13, 17, 18, 19, 20, 21, 25, 26, 28, 29, 33, 34, 35, 36, 37,
      41, 42, 43, 44, 45,
    ]); // 5x5 квадрат без центра = 24 ячейки
  });

  test('должен возвращать правильные ячейки для радиуса 4 из позиции 0', () => {
    const result = calcMoveRange(0, 4); // Угловая позиция (0,0)
    expect(result).toEqual([
      1, 2, 3, 4, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 32,
      33, 34, 35, 36,
    ]); // 5x5 - 1 = 24 ячейки
  });

  test('должен возвращать пустой массив для радиуса 0', () => {
    const result = calcMoveRange(27, 0);
    expect(result).toEqual([]); // Никаких ячеек, так как радиус 0
  });
});
