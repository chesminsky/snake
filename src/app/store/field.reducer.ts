import { createReducer, on } from '@ngrx/store';
import { randomEgg } from './field.actions';
import { GameField, GameMoveDirection } from '../models';

export const initialState: GameField = {
  direction: GameMoveDirection.Right,
  items: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};

const fieldReducerFn = createReducer((initialState),
  on(randomEgg, onRandomEgg),
);

export function fieldReducer(state, action) {
  return fieldReducerFn(state, action);
}


function onRandomEgg(state) {
  return state;
}
