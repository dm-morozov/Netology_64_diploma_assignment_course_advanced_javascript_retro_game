// src/ts/generators.ts

import Character from './Character';
import Team from './Team';
/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(
  allowedTypes: Array<new (level: number) => Character>,
  maxLevel: number
): Generator<Character> {
  // TODO: напишите логику здесь
  // так как это генератор, то мы будем использовать yield
  while (true) {
    const typeIndex = Math.floor(Math.random() * allowedTypes.length);
    const level = Math.floor(Math.random() * maxLevel) + 1;
    const CharacterClass = allowedTypes[typeIndex];
    yield new CharacterClass(level);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(
  allowedTypes: Array<new (level: number) => Character>,
  maxLevel: number,
  characterCount: number
): Team {
  // TODO: напишите логику здесь

  // Создаем новую команду
  const team = new Team();
  // Создаем гениратор
  const generator = characterGenerator(allowedTypes, maxLevel);
  // В цикле берём characterCount персонажей из генератора и добавляем в команду
  for (let i = 0; i < characterCount; i++) {
    team.addCharacter(generator.next().value);
  }
  // Возвращаем команду (экземпляр Team)
  return team;
}
