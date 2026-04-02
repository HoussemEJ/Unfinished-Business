import { computed, Directive, effect, ElementRef, inject, input } from '@angular/core';
import { DragHandler } from './drag-handler';
import { IColumn } from '../model';
import { Column } from '../board/column/column';

@Directive({
  selector: '[dropTarget]',
  host: {
    '(pointerenter)': 'onPointerEnter()',
    '(pointerdown)': 'onPointerDown()',
    '(pointerup)': 'onPointerUp()',
  },
})
export class DropTarget {
  private dragHandler = inject(DragHandler);
  el = inject<ElementRef<HTMLElement>>(ElementRef);
  column = input.required<IColumn>();

  protected onPointerEnter() {
    if (this.dragHandler.dragging()) {
      this.dragHandler.target.set(this.column().id);
      this.dragHandler.targetEl = this.el.nativeElement;

      this.dragHandler.movePlaceholder(this.el.nativeElement);
    }
  }

  protected onPointerDown() {}

  protected onPointerUp() {
    if (this.dragHandler.dragging()) {
      this.dragHandler.target.set(this.column().id);
      this.dragHandler.targetEl = this.el.nativeElement;
    }
  }
}
