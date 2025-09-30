// src/ts/characters/Vampire.ts

import Character from '../Character';

export default class Vampire extends Character {
  constructor(level: number) {
    super(level, 'vampire');
    this.attack = 25;
    this.defence = 25;
  }
}
