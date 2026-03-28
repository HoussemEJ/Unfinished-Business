import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card } from '../card/card';

@Component({
  selector: 'app-column',
  imports: [Card],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column {
  cards: string[] = Array(4).fill('Task sample.');
}
