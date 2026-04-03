import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Column } from './column/column';
import { CardController } from '../services/card-controller';
import { DropTarget } from '../drag-engine/drop-target';

@Component({
  selector: 'app-board',
  imports: [Column, DropTarget],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {
  private cardController = inject(CardController);

  columnHeaders = this.cardController.columnHeaders;
  columns = this.cardController.columns;
}
