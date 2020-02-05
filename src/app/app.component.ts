import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fieldReducer } from './store/field.reducer';
import { GameField, GameObject } from './models';
import { map } from 'rxjs/operators';
import { GameService } from './core/game.service';

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
  ) {}

  ngOnInit() {

    this.gameService.init();

    this.items$ = this.store$.pipe(select('field'), map((field) => field.items));
    this.items$.subscribe(console.log);
  }

}
