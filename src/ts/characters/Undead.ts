// src/ts/characters/Undead.ts

import Character from '../Character';

export default class Undead extends Character {
  constructor(level: number) {
    super(level, 'undead');
    this.attack = 40;
    this.defence = 10;
  }
}
