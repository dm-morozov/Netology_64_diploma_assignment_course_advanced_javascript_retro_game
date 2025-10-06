// src/ts/characters/Vampire.ts

import Character from '../Character';

export default class Vampire extends Character {
  constructor(level: number = 1) {
    super(level, 'vampire');
    this.attack = 25;
    this.defence = 20;

    if (level > 1) this.setLevel(level); // усиливаем врага под уровень игры
  }
}
