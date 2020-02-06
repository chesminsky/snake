import { createReducer, on } from '@ngrx/store';
import { randomEgg, tick, changeDirection } from './field.actions';
import { GameField, GameMoveDirection, Snake, GameFieldItems, GameObject } from '../models';
import { FIELD_SIZE } from '../constants';

export const initialState: GameField = {
  nextDirection: null,
  direction: GameMoveDirection.Right,
  items: generateField(),
  snake: [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}, {x: 2, y: 5}, {x: 1, y: 5}],
  valid: true,
  egg: { x: 1, y: 1},
  score: 0
};

const fieldReducerFn = createReducer((initialState),
  on(randomEgg, onRandomEgg),
  on(tick, onTick),
  on(changeDirection, onChangeDirection)
);

export function fieldReducer(state, action) {
  return fieldReducerFn(state, action);
}

function onRandomEgg(state): GameField {

  const randomize = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    if (
      state.snake.every((s) => s.x !== x && s.y !== y)
    ) {
      return randomize();
    }
    return { x, y };
  };

  if (!state.egg) {
    return { ...state, egg: randomize()}
  }

  return { ...state };
}

function onChangeDirection(state: GameField, { direction }): GameField {
  return { ...state, nextDirection: direction };
}

function onTick(state: GameField): GameField {

  let direction = state.direction;

  if (
    (state.nextDirection === GameMoveDirection.Right && state.direction !== GameMoveDirection.Left) ||
    (state.nextDirection === GameMoveDirection.Left && state.direction !== GameMoveDirection.Right) ||
    (state.nextDirection === GameMoveDirection.Up && state.direction !== GameMoveDirection.Down) ||
    (state.nextDirection === GameMoveDirection.Down && state.direction !== GameMoveDirection.Up)
  ) {
    direction = state.nextDirection;
  }

  const snake = moveSnake(state.snake, direction);

  let valid = true;

  const items = generateField();

  let egg = state.egg;
  let score = state.score;
  if (egg) {
    items[egg.y][egg.x] = GameObject.Egg;

    if (egg.x === snake[0].x && egg.y === snake[0].y) {
      egg = null;
      snake.push(snake[snake.length - 1]);
      score++;
    }
  }

  for (const [i, s] of snake.entries()) {
    items[s.y][s.x] = GameObject.Snake;

    if (i > 0 && s.x === snake[0].x && s.y === snake[0].y) {
      valid = false;
    }
  }

  return {
    ...state,
    snake,
    items,
    valid,
    direction,
    egg,
    score
  };
}

function moveSnake(snake: Snake, d: GameMoveDirection): Snake {

  const newSnake = [];

  for (const [i, item] of snake.entries()) {

    const newItem: { x?: number; y?: number; } = {};

    if (i === 0) {
      newItem.x = item.x;
      newItem.y = item.y;
      if (d === GameMoveDirection.Right) {
        newItem.x++;
      }
      if (d === GameMoveDirection.Left) {
        newItem.x--;
      }
      if (d === GameMoveDirection.Up) {
        newItem.y--;
      }
      if (d === GameMoveDirection.Down) {
        newItem.y++;
      }

      for (const key of ['x', 'y']) {
        if (newItem[key] < 0) {
          newItem[key] = FIELD_SIZE - 1;
        }
        if (newItem[key] > FIELD_SIZE - 1) {
          newItem[key] = 0;
        }
      }

    } else {
      newItem.x = snake[i - 1].x;
      newItem.y = snake[i - 1].y;
    }

    newSnake.push(newItem);
  }

  return newSnake;
}



function generateField(): GameFieldItems {
  const arr = [];
  for (let i = 0; i < FIELD_SIZE; i++) {
    arr[i] = [];
    for (let j = 0; j < FIELD_SIZE; j++) {
      arr[i][j] = GameObject.Empty;
    }
  }
  return arr;
}
