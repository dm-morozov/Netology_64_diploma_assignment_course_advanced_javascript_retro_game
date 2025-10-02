// src/ts/utils.ts

/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index: number, boardSize: number): string {
  // TODO: ваш код будет тут
  // console.log(index, boardSize); // для отладки
  // Номер строки
  const row = Math.floor(index / boardSize);
  // console.log(row); // для отладки
  // Номер столбца
  const col = index % boardSize;
  // console.log(col); // для отладки
  // Углы
  if (row === 0 && col === 0) return 'top-left';
  if (row === 0 && col === boardSize - 1) return 'top-right';
  if (row === boardSize - 1 && col === boardSize - 1) return 'bottom-right';
  if (row === boardSize - 1 && col === 0) return 'bottom-left';
  // Края
  if (row === 0) return 'top';
  if (row === boardSize - 1) return 'bottom';
  if (col === 0) return 'left';
  if (col === boardSize - 1) return 'right';
  // Центр
  return 'center';
}

export function calcHealthLevel(health: number): string {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

/**
 * Форматирует характеристики персонажа в строку для тултипа
 * @param strings - массив строк из шаблона
 * @param level - уровень персонажа
 * @param attack - атака персонажа
 * @param defence - защита персонажа
 * @param health - здоровье персонажа
 * @returns строка в формате "🎖1 ⚔10 🛡40 ❤50"
 */
export function formatCharacterInfo(
  strings: TemplateStringsArray,
  level: number,
  attack: number,
  defence: number,
  health: number
): string {
  return `${strings[0]}${level} ${strings[1].trim()}${attack} ${strings[2].trim()}${defence} ${strings[3].trim()}${health}`;
}

/**
 * Вычисляет индексы ячеек, в которые персонаж может переместиться,
 * исходя из текущей позиции и радиуса движения.
 * @param position Текущая позиция персонажа (индекс ячейки от 0 до 63).
 * @param moveRange Радиус движения персонажа (например, 4 для Swordsman).
 * @returns Массив индексов ячеек, куда можно пойти.
 */
export function calcMoveRange(position: number, moveRange: number): number[] {
  const result: number[] = [];
  const row = Math.floor(position / 8); // Строка текущей позиции
  const col = position % 8; // Столбец текущей позиции

  // Проверяем все ячейки поля 8x8
  for (let index = 0; index < 64; index++) {
    const targetRow = Math.floor(index / 8); // Строка целевой ячейки
    const targetCol = index % 8; // Столбец целевой ячейки
    // Манхэттенское расстояние
    // const distance = Math.abs(targetRow - row) + Math.abs(targetCol - col);

    // Шахматное расстояние
    const distance = Math.max(
      Math.abs(targetRow - row),
      Math.abs(targetCol - col)
    );
    if (distance <= moveRange && index != position) {
      result.push(index);
    }
  }

  return result;
}
