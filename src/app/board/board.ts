import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Column } from './column/column';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { LucideChevronLeft } from '@lucide/angular';
import { CardDto, Priority } from './card/card';
import { CardController } from './column/card-controller';

@Component({
  selector: 'app-board',
  imports: [Column, CdkDropList, CdkDropListGroup, LucideChevronLeft],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {
  private cardController = inject(CardController);
  titles = ['Unfinished Business', 'Marinating', 'In Shrimp Posture', 'Finished'];
  mockBoardData = this.cardController.mockBoardData;

  drop(event: CdkDragDrop<CardDto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
