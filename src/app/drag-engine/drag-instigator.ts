import { Directive, ElementRef, inject, input } from '@angular/core';
import { ICard } from '../model';
import { DragEventHandler } from './drag-event-handler';

@Directive({
  selector: '[dragInstigator]',
  host: {
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class DragInstigator {
  private eventHandler = inject(DragEventHandler);

  el = inject<ElementRef<HTMLElement>>(ElementRef);
  card = input.required<ICard>();

  protected onPointerDown(event: PointerEvent): void {
    const instigatorEl = this.el.nativeElement;
    const instigator = this.card().id;
    const source = this.card().column;

    this.eventHandler.handlePointerDown(event, instigatorEl, instigator, source);
  }
}
