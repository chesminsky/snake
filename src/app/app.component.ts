import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fieldReducer } from './store/field.reducer';
import { GameField } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  field$: Observable<GameField>;

  constructor(private store: Store<{ field: GameField }>) {
    this.field$ = store.pipe(select('field'));
  }

}
