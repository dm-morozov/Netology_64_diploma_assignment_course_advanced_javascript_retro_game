// src/ts/characters/Bowman.ts

import Character from '../Character';

export default class Bowman extends Character {
  constructor(level: number) {
    super(level, 'bowman');
    this.attack = 25;
    this.defence = 25;
  }
}
