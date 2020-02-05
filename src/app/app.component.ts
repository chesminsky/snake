import { Component, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fieldReducer } from './store/field.reducer';
import { GameField, GameObject, GameMoveDirection } from './models';
import { map } from 'rxjs/operators';
import { GameService } from './core/game.service';
import { changeDirection } from './store/field.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  items$: Observable<Array<Array<GameObject>>>;

  constructor(
    private store$: Store<{ field: GameField }>,
    private gameService: GameService
  ) { }

  ngOnInit() {

    this.gameService.init();

    this.items$ = this.store$.pipe(select('field'), map((field) => field.items));
    this.items$.subscribe(console.log);
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
