import { Component, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GameField, GameObject, GameMoveDirection } from './models';
import { changeDirection, tick } from './store/field.actions';
import { debounce } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lost = false;
  items: Array<Array<GameObject>> = [];
  private timerId;

  constructor(
    private store$: Store<{ field: GameField }>
  ) { }

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.store$.dispatch(tick());
    }, 500);

    this.store$.pipe(select('field'))
      .subscribe((field) => {
        this.items = field.items;
        if (!field.valid) {
          this.lost = true;
          clearInterval(this.timerId);
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
    if (event.key === 'w') {
      this.store$.dispatch(changeDirection({ direction: GameMoveDirection.Up}));
    }
    if (event.key === 's') {
      this.store$.dispatch(changeDirection({ direction: GameMoveDirection.Down}));
    }
    if (event.key === 'a') {
      this.store$.dispatch(changeDirection({ direction: GameMoveDirection.Left}));
    }
    if (event.key === 'd') {
      this.store$.dispatch(changeDirection({ direction: GameMoveDirection.Right}));
    }
  }

}
