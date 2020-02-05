import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameField } from '../models';
import { tick } from '../store/field.actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private store$: Store<{ field: GameField }>
  ) { }

  init() {
    setInterval(() => {
      this.store$.dispatch(tick());
    }, 300);
  }
}
