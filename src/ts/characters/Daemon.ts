// src/ts/characters/Daemon.ts

import Character from '../Character';

export default class Daemon extends Character {
  constructor(level: number = 1) {
    super(level, 'daemon');
    this.attack = 25;
    this.defence = 15;

    if (level > 1) this.setLevel(level); // усиливаем врага под уровень игры
  }
}
