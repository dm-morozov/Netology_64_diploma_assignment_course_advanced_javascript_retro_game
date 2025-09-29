// src/ts/utils.ts

console.log("utils");

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
  if (row === 0 && col === 0) return "top-left";
  if (row === 0 && col === boardSize - 1) return "top-right";
  if (row === boardSize - 1 && col === boardSize - 1) return "bottom-right";
  if (row === boardSize - 1 && col === 0) return "bottom-left";
  // Края
  if (row === 0) return "top";
  if (row === boardSize - 1) return "bottom";
  if (col === 0) return "left";
  if (col === boardSize - 1) return "right";
  // Центр
  return "center";
}

export function calcHealthLevel(health: number): string {
  if (health < 15) {
    return "critical";
  }

  if (health < 50) {
    return "normal";
  }

  return "high";
}
