import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Card, CardDto } from '../card/card';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { LucidePlus } from '@lucide/angular';

@Component({
  selector: 'app-column',
  imports: [Card, CdkDrag, CdkDragPlaceholder, LucidePlus],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column {
  cards = input<CardDto[]>();
}
