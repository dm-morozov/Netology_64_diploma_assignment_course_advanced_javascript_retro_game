# Дипломное задание к курсу «Продвинутый JavaScript». Retro Game

## Статус проекта

[![Build status](https://ci.appveyor.com/api/projects/status/t17ggq6elbpqyb6l?svg=true)](https://ci.appveyor.com/project/dm-morozov/netology-64-diploma-assignment-course-advanced-jav)
![CI](https://github.com/dm-morozov/Netology_64_diploma_assignment_course_advanced_javascript_retro_game/actions/workflows/web.yaml/badge.svg)
![Netology](https://img.shields.io/badge/TypeScript-WebPack-blue)

## Описание проекта

**Retro Game** — пошаговая стратегия, разработанная в рамках дипломного задания курса «Продвинутый JavaScript» от Нетологии. Игра представляет собой ретро-стилизованную битву на сетке 8x8, где игрок управляет командой персонажей (мечник, лучник, маг) против команды врагов (зомби, вампир, демон), управляемых ИИ. Цель игры — победить врагов, сохраняя своих персонажей, и набрать максимальный счёт. Проект направлен на освоение современных подходов к разработке на JavaScript и TypeScript, включая ООП, модульность, тестирование и работу с асинхронным кодом.

### Цели проекта
- **Учебные**: Научиться писать модульный, типизированный код, разрабатывать тесты, отлаживать ошибки и работать с инструментами сборки (Webpack, ESLint, Jest).
- **Технические**: Реализовать игровую логику, интерактивный интерфейс и функциональность сохранения/загрузки состояния, следуя спецификации из `descriptionGame.md`.

### Демо
Игра доступна онлайн: [Retro Game Web](https://dm-morozov.github.io/Netology_64_diploma_assignment_course_advanced_javascript_retro_game/)

## Функциональность

Проект реализует 11 задач, описанных в [`descriptionGame.md`](./descriptionGame.md), каждая из которых развивает навыки программирования:

1. **Инициализация игры**:
   - Загрузка игрового поля, размещение персонажей, установка слушателей событий.
   - **Навыки**: Работа с классами, DOM-событиями, настройка игровой логики.

2. **Создание команд**:
   - Генерация команд игрока и врагов с использованием `Team` и `PositionedCharacter`.
   - **Навыки**: ООП, использование генераторов для случайного размещения.

3. **Классы персонажей**:
   - Реализованы классы `Swordsman`, `Bowman`, `Magician`, `Undead`, `Vampire`, `Daemon` с уникальными характеристиками.
   - **Навыки**: Наследование, инкапсуляция, типизация в TypeScript.

4. **Движение персонажей**:
   - Персонажи перемещаются в пределах радиуса (4 клетки для мечника, 2 для лучника, 1 для мага).
   - **Навыки**: Алгоритмы расчёта расстояний, работа с координатами.

5. **Атака персонажей**:
   - Персонажи атакуют врагов в радиусе атаки, нанося урон с учётом защиты.
   - **Навыки**: Математические расчёты, асинхронные анимации.

6. **Интерфейс**:
   - Подсветка клеток (зелёная для движения, красная для атаки), тултипы с характеристиками, смена курсоров.
   - **Навыки**: Работа с DOM, обработка событий мыши, динамическое обновление UI.

7. **ИИ врагов**:
   - Враги атакуют ближайшего игрока или перемещаются к нему.
   - **Навыки**: Реализация ИИ, алгоритмы поиска пути.

8. **Уровни**:
   - Переход на новый уровень (тема `prairie`) после победы, с улучшением персонажей.
   - **Навыки**: Управление состоянием, обновление UI.

9. **Очки**:
   - Подсчёт очков за победу, сохранение максимального счёта.
   - **Навыки**: Работа с `localStorage`, обработка событий.

10. **Game Over**:
    - Сообщения о победе или поражении, блокировка игры.
    - **Навыки**: Управление состоянием, уведомления.

11. **Сохранение и загрузка**:
    - Сохранение/загрузка состояния (уровень, команды, счёт).
    - **Навыки**: Работа с `localStorage`, сериализация данных.

Все задачи покрыты юнит-тестами в `src/ts/__tests__/node/GameController.test.ts`, что гарантирует надёжность кода.

## Технологии

- **TypeScript**: Для строгой типизации и улучшения читаемости кода.
- **JavaScript (ES6+)**: Основной язык для игровой логики.
- **Webpack**: Для сборки проекта и управления зависимостями.
- **Jest**: Для юнит-тестирования.
- **ESLint**: Для поддержания стиля кода.
- **HTML/CSS**: Для интерфейса и стилизации.
- **Babel**: Для транспиляции современного JavaScript.

## Установка и запуск

### Требования
- **Node.js**: Версия 14.x или выше.
- **Yarn**: Пакетный менеджер.

### Инструкции
1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/dm-morozov/Netology_64_diploma_assignment_course_advanced_javascript_retro_game.git
   cd Netology_64_diploma_assignment_course_advanced_javascript_retro_game
   ```

2. **Установите зависимости**:
   ```bash
   yarn install
   ```

3. **Запустите проект в режиме разработки**:
   ```bash
   yarn dev
   ```
   Откройте [http://localhost:8080](http://localhost:8080).

4. **Соберите проект для продакшена**:
   ```bash
   yarn build
   ```

5. **Запустите тесты**:
   ```bash
   yarn test
   ```

6. **Проверьте стиль кода**:
   ```bash
   yarn lint:fix
   ```

## Структура проекта

```plaintext
Netology_64_diploma_assignment_course_advanced_javascript_retro_game/
├── .github/                          # Конфигурация GitHub Actions
├── .husky/                           # Настройки Husky для pre-commit хуков
├── .vscode/                          # Настройки VS Code
├── coverage/                         # Отчёты покрытия тестов
├── dist/                             # Скомпилированный проект
├── node_modules/                     # Зависимости
├── src/                              # Исходный код
│   ├── css/                          # Стили
│   │   └── style.css                 # Основной CSS-файл
│   ├── img/                          # Изображения
│   ├── ts/                           # TypeScript-код
│   │   ├── __tests__/                # Юнит-тесты
│   │   │   ├── e2e/                  # E2E-тесты
│   │   │   ├── node/                 # Юнит-тесты для Node.js
│   │   │   │   ├── Character.test.ts # Тесты для классов персонажей
│   │   │   │   ├── GameController.test.ts # Тесты игровой логики
│   │   │   │   ├── GameStateService.test.ts # Тесты сохранения/загрузки
│   │   │   │   ├── generators.test.ts # Тесты генераторов
│   │   │   │   ├── PositionedCharacter.test.ts # Тесты позиционирования
│   │   │   │   ├── utils.test.ts     # Тесты утилит
│   │   ├── characters/               # Классы персонажей
│   │   │   ├── Bowman.ts, Daemon.ts, Magician.ts, Swordsman.ts, Undead.ts, Vampire.ts
│   │   ├── app.ts                    # Точка входа приложения
│   │   ├── Character.ts              # Базовый класс персонажа
│   │   ├── cursors.ts                # Константы стилей курсора
│   │   ├── GameController.ts         # Основная игровая логика
│   │   ├── GameController.ts_OLD     # Старая версия GameController
│   │   ├── GamePlay.ts               # Управление интерфейсом
│   │   ├── GameState.ts              # Управление состоянием
│   │   ├── GameStateService.ts       # Сохранение/загрузка состояния
│   │   ├── generators.ts             # Генераторы для размещения
│   │   ├── PositionedCharacter.ts    # Класс персонажа с позицией
│   │   ├── Team.ts                   # Класс для команд
│   │   ├── themes.ts                 # Темы игрового поля
│   │   ├── utils.ts                  # Утилитарные функции
│   ├── types/                        # Типы TypeScript
│   ├── index.html                    # Главная HTML-страница
│   ├── index.ts                      # Точка входа для сборки
├── svg/                              # Иконки для README
├── .appveyor.yml                     # Конфигурация AppVeyor
├── .gitattributes, .gitignore        # Настройки Git
├── avengers.png                      # Изображение для проекта
├── babel.config.json                 # Конфигурация Babel
├── commit_message_guide.md           # Руководство по коммитам
├── descriptionGame.md                # Описание задач
├── eslint.config.mjs                 # Конфигурация ESLint
├── jest.config.js, jest.e2e.config.js # Конфигурации Jest
├── package.json                      # Зависимости и скрипты
├── tsconfig.json                     # Конфигурация TypeScript
├── webpack.common.mjs, webpack.dev.mjs, webpack.prod.mjs # Конфигурации Webpack
├── yarn.lock                         # Фиксация зависимостей
```

## Тестирование

Проект включает 74 юнит-теста в директории `src/ts/__tests__/node`, написанных с использованием **Jest**. Тесты покрывают ключевые модули:
- `GameController.test.ts`: Логика игры (инициализация, движение, атака, ИИ, уровни, очки, Game Over).
- `GameStateService.test.ts`: Сохранение/загрузка состояния.
- `Character.test.ts`: Поведение классов персонажей.
- `PositionedCharacter.test.ts`: Позиционирование персонажей.
- `generators.test.ts`: Генерация команд.
- `utils.test.ts`: Утилитарные функции.

### Покрытие кода
- **Общее покрытие**: ~62.22% (операторы), ~60.35% (ветки), ~52.1% (функции).
- **GameController.ts**: ~73.57% (строки), достаточно для учебного проекта.
- **Все тесты**: 74/74 проходят успешно.

Запустите тесты:
```bash
yarn test
```

### Пример теста
```typescript
test('игрок атакует врага в радиусе атаки', async () => {
  const player = new PositionedCharacter(new Swordsman(1), 0);
  const enemy = new PositionedCharacter(new Vampire(1), 1);
  gameController.playerTeam = [player];
  gameController.enemyTeam = [enemy];
  gameController.selectedCharacter = player;
  gameController.activePlayer = 'player';
  await gameController.onCellClick(1);
  expect(gamePlay.showDamage).toHaveBeenCalled();
  expect(enemy.character.health).toBeLessThan(100);
});
```

## 📧 Контакты

Если возникнут вопросы, пишите:

* ![LinkedIn](./svg/linkedin-icon.svg) [LinkedIn](https://www.linkedin.com/in/dm-morozov/)
* ![Telegram](./svg/telegram.svg) [Telegram](https://t.me/dem2014)
* ![GitHub](./svg/github-icon.svg) [GitHub](https://github.com/dm-morozov/)