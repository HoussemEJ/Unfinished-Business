import { Directive, inject, input } from '@angular/core';
import { DragHandler } from './drag-handler';
import { IColumn } from '../model';

@Directive({
  selector: '[dropTarget]',
  host: {
    '(pointerup)': 'setTarget()',
  },
})
export class DropTarget {
  private dragHandler = inject(DragHandler);
  column = input.required<IColumn>();

  protected setTarget(): void {
    this.dragHandler.target.set(this.column().id);
  }
}
