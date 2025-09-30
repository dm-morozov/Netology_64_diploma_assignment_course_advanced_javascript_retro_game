/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */

import Character from './Character';

export default class Team {
  // TODO: write your logic here
  private characters: Character[];

  constructor() {
    this.characters = [];
  }

  addCharacter(character: Character) {
    this.characters.push(character);
  }

  getCharacters(): Character[] {
    return this.characters;
  }
}
