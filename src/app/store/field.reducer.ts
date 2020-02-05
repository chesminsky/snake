import { createReducer, on } from '@ngrx/store';
import { randomEgg, tick, changeDirection } from './field.actions';
import { GameField, GameMoveDirection, Snake, GameFieldItems } from '../models';
import { FIELD_SIZE } from '../constants';

export const initialState: GameField = {
  direction: GameMoveDirection.Right,
  items: generateField(),
  snake: [{x: 5, y: 5}, {x: 4, y: 5}]
};

const fieldReducerFn = createReducer((initialState),
  on(randomEgg, onRandomEgg),
  on(tick, onTick),
  on(changeDirection, onChangeDirection)
);

export function fieldReducer(state, action) {
  return fieldReducerFn(state, action);
}


function onRandomEgg(state) {
  return state;
}

function onChangeDirection(state: GameField, { direction }) {
  if (
    (direction === GameMoveDirection.Right && state.direction !== GameMoveDirection.Left) ||
    (direction === GameMoveDirection.Left && state.direction !== GameMoveDirection.Right) ||
    (direction === GameMoveDirection.Up && state.direction !== GameMoveDirection.Down) ||
    (direction === GameMoveDirection.Down && state.direction !== GameMoveDirection.Up)
  ) {
    state.direction = direction;
  }
  return state;
}

function onTick(state: GameField) {

  state.snake = moveSnake(state.snake, state.direction);
  state.items = getFieldItems(state.items, state.snake);

  return state;
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
  console.log('snake', newSnake);
  return newSnake;
}

function getFieldItems(field: GameFieldItems, snake: Snake): GameFieldItems {
  for(const row of field) {
    for(let i of row.keys()) {
      row[i] = 0;
    }
  }

  for (const item of snake) {
    field[item.y][item.x] = 1;
  }
  console.log('field', field);
  return field;
}


function generateField(): GameFieldItems {
  const arr = [];
  for (let i = 0; i < FIELD_SIZE; i++) {
    arr[i] = [];
    for (let j = 0; j < FIELD_SIZE; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
