import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from '../card/card';
import { DragInstigator } from '../../drag-engine/drag-instigator';
import { ICard, IColumn } from '../../model';

@Component({
  selector: 'app-column',
  imports: [Card, DragInstigator],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column {
  column = input.required<IColumn>();
  cards = input<ICard[]>();
}
