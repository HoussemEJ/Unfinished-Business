import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card, CardDto } from '../card/card';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  imports: [Card, CdkDrag, CdkDragPlaceholder],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column {
  cards = input<CardDto[]>();
}
