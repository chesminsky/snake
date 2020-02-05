import { createAction, props } from '@ngrx/store';
import { GameMoveDirection } from '../models';

export const randomEgg = createAction('[Field] random egg');
export const changeDirection = createAction('[Field] change direction', props<{ direction: GameMoveDirection }>());
export const tick = createAction('[Field] tick');
