import { createReducer, on } from '@ngrx/store';
import { randomEgg, tick, changeDirection } from './field.actions';
import { GameField, GameMoveDirection, Snake, GameFieldItems, GameObject } from '../models';
import { FIELD_SIZE } from '../constants';

export const initialState: GameField = {
  nextDirection: null,
  direction: GameMoveDirection.Right,
  items: generateField(),
  snake: [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}, {x: 2, y: 5}, {x: 1, y: 5}],
  valid: true
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
  const { items, valid } = getFieldItems(state.items, snake);

  return {
    ...state,
    snake,
    items,
    valid,
    direction
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

function getFieldItems(items: GameFieldItems, snake: Snake): { items: GameFieldItems, valid: boolean } {

  let valid = true;

  const newItems = generateField();

  for (const item of snake) {
    const o = newItems[item.y][item.x];
    if (o === GameObject.Empty) {
      newItems[item.y][item.x] = 1;
    }
    if (o === GameObject.Snake) {
      valid = false;
    }
  }

  return { items: newItems, valid };
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
