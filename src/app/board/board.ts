import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Column } from './column/column';

@Component({
  selector: 'app-board',
  imports: [Column],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {
  titles = ['Unfinished Buisness', 'Will do', 'Doing it', 'Fertig'];
}
