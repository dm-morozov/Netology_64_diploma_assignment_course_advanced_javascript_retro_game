// src/ts/characters/Swordsman.ts

import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level: number) {
    super(level, 'swordsman');
    this.attack = 40;
    this.defence = 10;
  }
}
