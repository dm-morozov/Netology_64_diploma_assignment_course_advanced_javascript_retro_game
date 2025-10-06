// src/ts/characters/Undead.ts

import Character from '../Character';

export default class Undead extends Character {
  constructor(level: number = 1) {
    super(level, 'undead');
    this.attack = 40;
    this.defence = 10;

    if (level > 1) this.setLevel(level); // усиливаем врага под уровень игрыs
  }
}
