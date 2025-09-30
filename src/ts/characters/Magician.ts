// src/ts/characters/Magician.ts

import Character from '../Character';

export default class Magician extends Character {
  constructor(level: number) {
    super(level, 'magician');
    this.attack = 10;
    this.defence = 40;
  }
}
