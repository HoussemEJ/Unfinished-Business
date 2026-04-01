import { Directive, ElementRef, inject, input } from '@angular/core';
import { DragHandler } from './drag-handler';
import { ICard } from '../model';

@Directive({
  selector: '[dragInstigator]',
  host: {
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class DragInstigator {
  private dragHandler = inject(DragHandler);
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  card = input.required<ICard>();

  protected onPointerDown(event: PointerEvent): void {
    this.dragHandler.dragStart(event, this.el.nativeElement, this.card().id, this.card().column);
  }
}
