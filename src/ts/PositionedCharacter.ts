// src/ts/PositionedCharacter.ts

import Character from './Character';

export default class PositionedCharacter {
  public character: Character;
  public position: number;

  constructor(character: Character, position: number) {
    if (!(character instanceof Character)) {
      throw new Error(
        'Первый параметр должен быть экземпляром Character или его дочерними элементами'
      );
    }

    if (typeof position !== 'number') {
      throw new Error('позиция должна быть числом');
    }

    this.character = character;
    this.position = position;
  }
}
