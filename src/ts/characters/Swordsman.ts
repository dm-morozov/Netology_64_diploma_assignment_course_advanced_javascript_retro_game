// src/ts/characters/Swordsman.ts

import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level: number = 1) {
    // Всегда начинаем с 1 уровня как по заданию,
    // а LevelUp увеличит его
    super(1, 'swordsman');
    this.attack = 40;
    this.defence = 10;

    for (let i = 1; i < level; i++) {
      this.levelUp(); // Используем логику LevelUp для повышения статов
    }
  }
}
