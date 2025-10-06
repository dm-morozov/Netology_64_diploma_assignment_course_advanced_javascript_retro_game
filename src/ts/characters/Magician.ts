// src/ts/characters/Magician.ts

import Character from '../Character';

export default class Magician extends Character {
  constructor(level: number = 1) {
    // Всегда начинаем с 1 уровня как по заданию,
    // а LevelUp увеличит его
    super(1, 'magician');
    this.attack = 25;
    this.defence = 15;

    for (let i = 1; i < level; i++) {
      this.levelUp(); // Используем логику LevelUp для повышения статов
    }
  }
}
