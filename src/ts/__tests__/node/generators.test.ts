import {
  characterGenerator,
  generateTeam,
  generatePositions,
} from '../../generators';
import Team from '../../Team';
import Swordsman from '../../characters/Swordsman';
import Bowman from '../../characters/Bowman';
import PositionedCharacter from '../../PositionedCharacter';

describe('generateTeam', () => {
  test('characterGenerator должен генерировать случайных персонажей', () => {
    const allowedTypes = [Swordsman, Bowman];
    const maxLevel = 3;
    const generator = characterGenerator(allowedTypes, maxLevel);
    const character1 = generator.next().value;
    const _character2 = generator.next().value;

    expect(allowedTypes.some((Type) => character1 instanceof Type)).toBe(true);
    expect(allowedTypes.some((Type) => _character2 instanceof Type)).toBe(true);
    // проверяет, что полученное значение больше или равно 1
    expect(character1.getLevel()).toBeGreaterThanOrEqual(1);
    // проверяет, что полученное значение меньше или равно 2
    expect(character1.getLevel()).toBeLessThanOrEqual(3);
  });

  test('generateTeam должен генерировать команду', () => {
    const allowedTypes = [Swordsman, Bowman];
    const team = generateTeam(allowedTypes, 2, 3);
    expect(team instanceof Team).toBe(true);
    expect(team.getCharacters().length).toBe(3);
    expect(
      team
        .getCharacters()
        .every((char) => allowedTypes.some((Type) => char instanceof Type))
    ).toBe(true);
    expect(
      team
        .getCharacters()
        .every((char) => char.getLevel() >= 1 && char.getLevel() <= 2)
    ).toBe(true);
  });
});

describe('generatePositions', () => {
  test('должен размещать персонажей на уникальных позициях', () => {
    const team = [new Swordsman(1), new Bowman(2)];
    const positions = [0, 1, 8, 9];
    const result = generatePositions(team, positions);

    expect(result.length).toBe(2); // количество размещенных персонажей
    expect(result.every((item) => item instanceof PositionedCharacter)).toBe(
      true
    ); // проверка на экземпляр класса PositionedCharacter
    expect(result.every((item) => positions.includes(item.position))).toBe(
      true
    ); // все персонажи расположены только на разрешённых позициях
    expect(new Set(result.map((item) => item.position)).size).toBe(2); // проверка на уникальность позиций
  });
});
