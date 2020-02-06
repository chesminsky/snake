import { Component, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GameField, GameObject, GameMoveDirection } from './models';
import { changeDirection, tick, randomEgg } from './store/field.actions';
import { debounce } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lost = false;
  items: Array<Array<GameObject>> = [];
  score = 0;

  constructor(
    private store$: Store<{ field: GameField }>
  ) { }

  ngOnInit() {
    const fieldTicker = setInterval(() => {
      this.store$.dispatch(tick());
    }, 500);

    const eggTicker = setInterval(() => {
      this.store$.dispatch(randomEgg());
    }, 5000);

    this.store$.pipe(select('field'))
      .subscribe((field) => {
        this.items = field.items;
        this.score = field.score;
        if (!field.valid) {
          this.lost = true;
          clearInterval(fieldTicker);
          clearInterval(eggTicker);
        }
      });
  }

  getCellClass(item: number) {
    return {
      snake: item === GameObject.Snake,
      egg: item === GameObject.Egg
    };
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowUp') {
      this.store$.dispatch(changeDirection({ direction: GameMoveDirection.Up}));
    }
    if (event.key === 'ArrowDown') {
      this.store$.dispatch(changeDirection({ direction: GameMoveDirection.Down}));
    }
    if (event.key === 'ArrowLeft') {
      this.store$.dispatch(changeDirection({ direction: GameMoveDirection.Left}));
    }
    if (event.key === 'ArrowRight') {
      this.store$.dispatch(changeDirection({ direction: GameMoveDirection.Right}));
    }
  }

}
