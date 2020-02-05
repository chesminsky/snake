import { Component, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fieldReducer } from './store/field.reducer';
import { GameField, GameObject, GameMoveDirection } from './models';
import { map } from 'rxjs/operators';
import { changeDirection, tick } from './store/field.actions';

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
    }, 300);

    this.store$.pipe(select('field'))
      .subscribe((field) => {
        this.items = JSON.parse(JSON.stringify(field.items));
        if (!field.valid) {
          this.lost = true;
          clearInterval(this.timerId);
        }
      });
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
